import Image from "next/image";
import React, {useEffect, useState} from "react";
import { useRouter } from 'next/router';
import {useData} from "../../modules/context/DataContext";
import UserMenu from "../UserMenu";
import Modal from "../Modal";

const TopNavDashboard = () => {
    const { profile } = useData();
    const router = useRouter();
    const [pathName,setPathName] = useState<string|undefined>(undefined)
    const [isAdminPage, setIsAdminPage] = useState(false)
    const [hideSearch, setHideSearch] = useState(false)
    const [showModal, setShowModal] = React.useState(false);

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
    const handleAddNew = () =>{
        if(!isAdminPage){
            router.push("/add_garage").catch(error => {console.error(error)})
        }
        else {
            setShowModal(true)
        }
    }

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
        <button onClick={()=> {handleAddNew()}} className={"text-white flex items-center gap-3 bg-primary py-3 px-2 rounded-2xl"}>
            <span>
                Add new {isAdminPage?"Company":"Parking"}
            </span>
            <span className="material-symbols-outlined rounded px-1 py-1 bg-white/50 text-white">add</span>
        </button>
        <Modal showModal={showModal} setShowModal={setShowModal}/>
        <UserMenu profile={profile}/>


    </div>
}
export default TopNavDashboard