import GarageOrCompanyView from "../_Parties/garageOrCompany/GarageOrCompanyView";
import {garageShape} from "../../context/DataContext";
import {useEffect, useState} from "react";
import Constants from "../../../system/constants";
import axios from "axios";
import {getHeaders} from "../../../system/constants/config";

const DashboardActivity = ({searchText}:{searchText:string}) => {
    const [garages, setGarages] = useState<garageShape[]>([])
    useEffect(() => {
        let url = `${Constants.BACKEND_URL}${Constants.endpoints.GARAGES}/user`;
        axios.get(url, getHeaders()).then(response => {
            if(response.status === 200){
                // let {data:{data:{rows}}} = response
                try {
                    setGarages([...response.data.data.rows])
                }catch (err ){
                    console.error(err)
                }
            }
        }).catch(error => {
            console.error(error)
        })
    }, [])
    return <>
        <div className="flex flex-col gap-6">
            <h4 className="text-3xl">Your Parking spaces</h4>
            <div className={"flex gap-2 flex-wrap justify-evenly"}>
                {garages?.filter(each =>{
                    return each.name.toLowerCase().includes(searchText.toLowerCase())
                        || each.address.toLowerCase().includes(searchText.toLowerCase())
                        || each.description.toLowerCase().includes(searchText.toLowerCase());
                }).map(garage => {
                    return (<GarageOrCompanyView key={garage.id} garage={garage}/>)
                })}

            </div>
        </div>
    </>
}

export default DashboardActivity