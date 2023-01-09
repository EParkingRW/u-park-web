import Image from "next/image";
import React from "react";
import garageEnum from "../../interfaces/Garage.enum";
import GarageNav from "../../interfaces/Garage.enum";
import {useRouter} from "next/router";

const Line_separator = () => {
    const light_height = 'h-[60px]'
    return(
        <div className={"relative w-12 "+light_height}>
            <Image
                fill={true}
                src={"/asserts/images/Line_.svg"} alt={""}/>
        </div>
    )
}
const Button_style = ({active, text, icon = 'grid_view', onClick}:{text:string, active:boolean, icon?:string, onClick?:()=>void}) => {
    return (
        <button onClick={() => onClick && onClick()}
                className={"w-full flex flex-col gap-2 items-center rounded-xl border-primary border-2 px-10 py-2 " + (active?"bg-primary/90 hover:bg-primary text-white":"text-primary hover:bg-primary/10")}>
            <span className="material-symbols-outlined">{icon}</span>
            <span className={""}> {text}</span>
        </button>
    )
}

const SideNavigation = ({activeTab, garageId}:{activeTab:garageEnum, garageId:string}) => {
    const router = useRouter();

    return <div className={"flex flex-col justify-between h-full items-center"}>
        <Button_style active={activeTab === GarageNav.DASHBOARD} text={"Dashboard"}
                      onClick={()=>{router.push(`/garage_view/${garageId}?tab=${garageEnum.DASHBOARD}`).catch(e => console.error(e))}}
        />
        <Line_separator/>

        <Button_style active={activeTab === GarageNav.ENTRANCE} text={"Entrance"} icon={"commute"}
                      onClick={()=>{router.push(`/garage_view/${garageId}?tab=${garageEnum.ENTRANCE}`).catch(e => console.error(e))}}
        />
        <Line_separator/>

        <Button_style active={activeTab === GarageNav.EXIT} text={"Exit"} icon={"garage"}
                      onClick={()=>{router.push(`/garage_view/${garageId}?tab=${garageEnum.EXIT}`).catch(e => console.error(e))}}
        />
        <Line_separator/>

        <Button_style active={activeTab === GarageNav.SPACE} text={"Space"} icon={"space_dashboard"}
                      onClick={()=>{router.push(`/garage_view/${garageId}?tab=${garageEnum.SPACE}`).catch(e => console.error(e))}}
        />

    </div>
}


export default SideNavigation