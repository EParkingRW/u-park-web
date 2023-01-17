import Image from "next/image";
import { useRouter } from 'next/router';
import {garageShape} from "../../../../context/DataContext";

const GarageOrCompanyView = ({isAdmin=false, garage}:{isAdmin?:boolean,garage?:garageShape}) => {
    const router = useRouter();
    return <>
        <div className={"justify-between flex flex-col rounded-3xl bg-[#FFF4F4] w-[428px] h-[486px] py-4 px-2"}>
            <span className={"self-center text-3xl font-bold"}>
                {isAdmin ?"Company " : "Garage "}Details
            </span>
            <div className={"relative w-[368px] h-[176px] self-center"}>
                <Image
                    alt={""}
                    src={garage?.imageUrl || ""}
                    className="rounded-2xl min-w-max"
                    fill
                />
            </div>
            <div className={"flex flex-col gap-2 ml-2"}>
                <span className={"text-xl"}>
                {garage?.name}
            </span>
                {isAdmin ? null :
                <span className={"text-black_light"}>
                {garage?.address}
            </span>
                }
            </div>

            <div className={"flex gap-3 w-full"}>
                <button className={"w-full rounded-2xl py-3 text-primary bg-black_light/30"}>Edit</button>
                <button onClick={() => {isAdmin? router.push('/dashboard') : router.push(`/garage_view/${garage?.id}`)}} className={"flex w-full items-center justify-center text-white bg-primary rounded-2xl py-3"}>
                    <span>{isAdmin ? "View": "Details"}</span>
                    <span className="material-symbols-outlined">arrow_forward_ios</span>
                </button>
            </div>
        </div>
    </>
}

export default GarageOrCompanyView