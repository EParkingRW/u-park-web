import {useState} from "react";

const DrawerLayout = ({children, toggle, setToggle, title}:{children:any, toggle:boolean, setToggle:Function, title:string}) => {

    return (
        <div className={"absolute top-0 " + toggle ? "opacity-100": "opacity-0"}>
            {children}
        </div>
    )
}

export default DrawerLayout;