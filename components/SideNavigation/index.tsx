import Image from "next/image";
import React, {useState} from "react";

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
const Button_style = ({text, icon = 'grid_view'}:{text:string, icon?:string}) => {
    return (
        <button className={"hover:bg-primary/10 w-full flex flex-col gap-2 text-primary items-center rounded-xl border-primary border-2 px-10 py-2"}>
            <span className="material-symbols-outlined">{icon}</span>
            <span className={""}> {text}</span>
        </button>
    )
}

const SideNavigation = () => {


    return <div className={"flex flex-col justify-between h-full items-center"}>
        <Button_style text={"Dashboard"}/>
        <Line_separator/>

        <Button_style text={"Entrance"} icon={"commute"}/>
        <Line_separator/>

        <Button_style text={"Exit"} icon={"garage"}/>
        <Line_separator/>

        <Button_style text={"Space"} icon={"space_dashboard"}/>

    </div>
}


export default SideNavigation