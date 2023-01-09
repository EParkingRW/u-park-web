import {garageShape, useData} from "../../context/DataContext";
import SideNavigation from "../../../components/SideNavigation";
import GarageDashboard from "./parties/dashboard";
import {useEffect, useState} from "react";
import vehicleInterface, {vehicleInterfaceBackend} from "../../../interfaces/vehicle.interface";
import {convertFromStringToDate} from "../../../utils/functions";
import GarageNav from "../../../interfaces/Garage.enum";
import GarageExitActivity from "../GarageExitActivity";
import GarageEntranceActivity from "../GarageEntranceActivity";
import GarageSpaceActivity from "../GarageSpaceActivity";
import GarageEnum from "../../../interfaces/Garage.enum";


const GarageViewActivity = ({garage, tab}:{garage:garageShape, tab:GarageEnum}) => {
    const {socket} = useData();
    const [activeTab, setActiveTab] = useState<GarageNav>(GarageNav.EXIT);
    const [recentVehicleIn, setRecentVehicleIn] = useState<vehicleInterface|null>(null)
    const [recentVehicleOut, setRecentVehicleOut] = useState<vehicleInterface|null>(null)
    const [autoSwitchTabs, setAutoSwitchTabs] = useState(true)

    useEffect(() => {
        if(!tab){
            return;
        }
        setActiveTab(tab);
    }, [tab])
    useEffect(()=> {
        if(!socket){
            return;
        }
        socket.emit("join", garage.id);
        socket.on(garage.id, (data:any) => {
            console.log("dataFromSocket after join", data);
        })
        socket.on("vehicleRoom", (data:{data:vehicleInterfaceBackend}) => {
            const vehicle:vehicleInterface = {...data.data, createdAt: convertFromStringToDate(data.data.createdAt),
                updatedAt:convertFromStringToDate(data.data.updatedAt)}

            if(vehicle.isInside){
                setRecentVehicleIn(vehicle)
                if(autoSwitchTabs){
                    setActiveTab(GarageNav.ENTRANCE)
                }
            }else {
                setRecentVehicleOut(vehicle)
                if(autoSwitchTabs){
                    setActiveTab(GarageNav.EXIT)
                }
            }
        });
    }, [autoSwitchTabs, garage.id, socket]);
    return (
        <div className={"flex gap-5"}>
            {activeTab === GarageNav.DASHBOARD ? <GarageDashboard/>:null}
            {activeTab === GarageNav.EXIT ? <GarageExitActivity recentVehicleOut={recentVehicleOut}  />:null}
            {activeTab === GarageNav.ENTRANCE ? <GarageEntranceActivity recentVehicleIn={recentVehicleIn}/>:null}
            {activeTab === GarageNav.SPACE ? <GarageSpaceActivity/>:null}
            <div className="flex flex-col gap-5 self-start">
                <SideNavigation activeTab={activeTab} garageId={garage.id}/>
                <form>
                    <label className="flex gap-2">
                        <input type="checkbox" readOnly={true} onClick={()=>{setAutoSwitchTabs(i => !i)}} checked={autoSwitchTabs} />
                        <span>Auto switch tabs</span>
                    </label>
                </form>
            </div>

        </div>
    )
}

export default GarageViewActivity;