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
import Image from "next/image";


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
    }, [autoSwitchTabs, garage, socket]);
    return (
    <div className={"flex gap-5"}>
        <div className="flex flex-col gap-12 flex-1">
            <div
                className="flex mx-auto w-full flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <Image width={500} height={200} className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                       src={garage.imageUrl} alt=""/>
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {garage.name}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {garage.description}
                    </p>
                    <span
                        className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{garage.address}</span>
                </div>
            </div>
            {activeTab === GarageNav.DASHBOARD ? <GarageDashboard garage={garage}/>:null}
            {activeTab === GarageNav.EXIT ? <GarageExitActivity garage={garage} recentVehicleOut={recentVehicleOut}  />:null}
            {activeTab === GarageNav.ENTRANCE ? <GarageEntranceActivity garage={garage} recentVehicleIn={recentVehicleIn}/>:null}
            {activeTab === GarageNav.SPACE ? <GarageSpaceActivity garage={garage}  />:null}
        </div>
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