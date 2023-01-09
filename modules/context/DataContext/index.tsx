import React, {useEffect, useState} from "react";
import Secure from "../../../system/helpers/secureLs";
import Keys from "../../../system/constants/keys";
import axios from "axios";
import Constants from "../../../system/constants";
import io from "socket.io-client";
import constants from "../../../system/constants";

export interface garageShape{
    name: string,
    address: string,
    latitude:number,
    longitude:number,
    hourlyFee: number,
    openingTime: string,
    closingTime: string,
    description: string,
    slots: number,
    imageUrl:string,
    id:string,
    takenSlots:number,
    userId:string,
    createdAt:string,
}
export interface profileData{
    active: boolean
    createdAt: string
    dateOfBirth: string
    email: string
    fullName: string
    gender: string
    id: string
    phoneNumber: string
    status: number
    updatedAt: string
    userName: string
}
export interface dataShape {
    profile:profileData|undefined,
    garages:garageShape[],
    setGarages:React.Dispatch<React.SetStateAction<garageShape[]>>,
    setProfile:React.Dispatch<React.SetStateAction<any>>,
    socket:any,
}
export const defaultValue: Readonly<dataShape> = {
    profile: undefined,
    garages:[],
    setGarages(){},
    setProfile(){},
    socket:undefined,
};
export const useData = () => {
    return React.useContext(DataContext);
};

export const DataContext = React.createContext<dataShape>(defaultValue);

const DataProvider = ({children}:any) =>{
    // @ts-ignore
    const [socket] = useState(io(constants.BACKEND_URL));
    const [profile, setProfile] = useState<any>(undefined)
    const [garages, setGarages] = useState<garageShape[]>([])

    React.useEffect(() =>{
        const user = Secure.get(Keys.USER_INFO as string);
        if (user) {
            setProfile((prev: any) => {
                if (!prev) {
                    return user;
                }
                return prev;
            });
        }
    }, [])
    React.useEffect(()=>{
        axios.get(Constants.BACKEND_URL + Constants.endpoints.GARAGES).then(response => {
            if(response.status === 200){
                let {data:{data:{rows}}} = response
                setGarages([...rows])
                console.log(rows)
            }
        }).catch(error => {
            console.error(error)
        })
    },[])
    const loadCars = () => {
        return axios.get(constants.BACKEND_URL+"/api/v1/vehicles")
            .then(function (response) {
                if(response.status === 201 || response.status === 200){
                    console.log("inside state")
                    console.log(response.data.data.data);

                    return {payload: [...response.data.data.data], status: Constants.status.DONE}
                }
                else {
                    return {payload: [response.data], status: Constants.status.ERROR}
                }

            }).then((output) => {
                return {...output}
            })
            .catch(function (error) {
                console.log("before error")
                console.log(error)
                return {payload: {...error.response}, status: constants.status.ERROR}
            });
    }
    useEffect(() => {
        socket.on("connection", () => console.log("connected"));
        socket.on("garage", (data) => {
            let {data:newGarage} = data;
            setGarages(oldG => [...oldG.filter(
                each => each.id !== newGarage.id),
                newGarage])

            console.log("new garage", newGarage);
        });
        socket.on("disconnect", () => console.log("disconnected"));
        socket.emit("join", "GarageRoom");
        socket.on('GarageRoom', (data) => {
            console.log("soketttt----::: ",data);
        });


    },[socket])




    const value = React.useMemo(()=>{
        return {
            profile,setProfile,garages, setGarages, socket,
        }
    }, [profile,garages, socket])

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider