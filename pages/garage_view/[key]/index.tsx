import DashboardScaffold from "../../../modules/layouts/DashboardScaffold";
import GarageViewActivity from "../../../modules/activities/GarageViewActivity";
import {GetServerSideProps} from "next";
import axios from "axios";
import Constants from "../../../system/constants";
import {garageShape} from "../../../modules/context/DataContext";
import garageEnum from "../../../interfaces/Garage.enum";

const garageView = ({garage,tab}:{garage:garageShape, tab:string}) => {
    //http://localhost:3000/garage_view/58d9370a-6b6f-4441-b1c9-cc2a2fb88454?tab=4

    return <>
        <header>
            <title>
                Garage view
            </title>
        </header>
        <DashboardScaffold>
            <GarageViewActivity tab={+tab} garage={garage}/>
        </DashboardScaffold>

    </>
}
export const getServerSideProps: GetServerSideProps = async ({query, params}) => {
    const garageId = params?.key;
    let url = `${Constants.BACKEND_URL}${Constants.endpoints.GARAGES}/${garageId}`;
    let garage = null;
    await axios.get(url).then(response => {
        if(response.status === 200){
            // let {data:{data:{rows}}} = response
            garage = response.data.data;
        }``
    }).catch(error => {
        console.error(error)
    })
    return {
        props: {
            garage:garage,
            tab:query.tab || garageEnum.DASHBOARD,
        },
    };
};


export default garageView