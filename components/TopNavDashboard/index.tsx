import Image from "next/image";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import {useData} from "../../modules/context/DataContext";

const TopNavDashboard = () => {
    const { profile } = useData();
    const router = useRouter();
    const [pathName,setPathName] = useState<string|undefined>(undefined)
    const [isAdminPage, setIsAdminPage] = useState(false)
    const [hideSearch, setHideSearch] = useState(false)

    useEffect(()=>{
        setIsAdminPage(false)
        setHideSearch(false)
        switch (router.pathname){
            case "/admin":{
                setPathName("Admin")
                setIsAdminPage(true)
                break
            }
            case "/dashboard":{
                setPathName("Dashboard")
                break
            }
            case "/garage_view":{
                setPathName("Garage view")
                setHideSearch(true)
                break
            }

            default : {
                setPathName(router.pathname.substring(1))
            }

        }
    },[router])

    return <div className={"w-full flex justify-between pt-1 flex-wrap gap-2"}>
        <div className={"flex items-center"}>
            <Image
                width={"40"} height={40}
                src={"/asserts/images/u_park_logo.svg"} alt={""}/>
            <span className={"text-primary"}>
            {pathName}
        </span>
        </div>
        {hideSearch ? null :
        <form className={"text-primary flex items-center gap-1 border-primary border-2 py-3 px-2 rounded-2xl min-w-[304px] "}>
            <input className={"placeholder-primary border-none focus:border-none w-full"} placeholder={"can’t find "+(isAdminPage?"Company":"Garage+")+" ? search it here!"}/>
            <span className="material-symbols-outlined rounded px-1 py-1 bg-primary text-white">search</span>
        </form>
        }
        <Link href={"/add_garage"}>
            <button className={"text-white flex items-center gap-3 bg-primary py-3 px-2 rounded-2xl"}>
            <span>
                Add new {isAdminPage?"Company":"Garage"}
            </span>
                <span className="material-symbols-outlined rounded px-1 py-1 bg-white/50 text-white">add</span>
            </button>
        </Link>

        <div className={"text-white flex items-center justify-between gap-1 bg-primary py-1 px-2 rounded-2xl min-w-[272px]"}>
            <span className="material-symbols-outlined rounded-full px-3 py-3 bg-white/50 text-white">person</span>
            <span>
                {profile?.userName}
            </span>
            <button className="material-symbols-outlined rounded px-1 py-1 text-3xl text-white">arrow_drop_down</button>
        </div>


    </div>
}
export default TopNavDashboard