import Image from "next/image";
import React from "react";
import Link from "next/link";

const TopNavDashboard = () => {

    return <div className={"w-full flex justify-between pt-1 flex-wrap gap-2"}>
        <div className={"flex items-center"}>
            <Image
                width={"40"} height={40}
                src={"/asserts/images/u_park_logo.svg"} alt={""}/>
            <span className={"text-primary"}>
            Dashboard
        </span>
        </div>
        <form className={"text-primary flex items-center gap-1 border-primary border-2 py-3 px-2 rounded-2xl min-w-[304px]"}>
            <input className={"placeholder-primary border-none focus:border-none w-full"} placeholder={"can’t find Garage? search it here!"}/>
            <span className="material-symbols-outlined rounded px-1 py-1 bg-primary text-white">search</span>
        </form>
        <Link href={"/add_garage"}>
            <button className={"text-white flex items-center gap-3 bg-primary py-3 px-2 rounded-2xl"}>
            <span>
                Add new Garage
            </span>
                <span className="material-symbols-outlined rounded px-1 py-1 bg-white/50 text-white">add</span>
            </button>
        </Link>

        <div className={"text-white flex items-center justify-between gap-1 bg-primary py-1 px-2 rounded-2xl min-w-[272px]"}>
            <span className="material-symbols-outlined rounded-full px-3 py-3 bg-white/50 text-white">person</span>
            <span>
                Adeline
            </span>
            <button className="material-symbols-outlined rounded px-1 py-1 text-3xl text-white">arrow_drop_down</button>
        </div>


    </div>
}
export default TopNavDashboard