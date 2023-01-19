import CarsTable from "./parties/CarsTable";
import {garageShape} from "../../context/DataContext";
import {useEffect, useState} from "react";
import Constants from "../../../system/constants";
import axios from "axios";
import {getHeaders} from "../../../system/constants/config";
import vehicleInterface, {vehicleInterfaceBackend} from "../../../interfaces/vehicle.interface";
import {convertFromStringToDate} from "../../../utils/functions";

const GarageSpaceActivity = ({garage}:{garage:garageShape|null}) => {
    const [vehicles, setVehicles] = useState<vehicleInterface[]>([])
    useEffect(() => {
        let url = `${Constants.BACKEND_URL}${Constants.endpoints.VEHICLE_IN_GARAGE}/${garage?.id}`;
        axios.get(url, getHeaders()).then(response => {
            const {data:{data:{rows}}} = response
            setVehicles(rows.map((each:vehicleInterfaceBackend) =>{
                return {...each,
                    createdAt: convertFromStringToDate(each.createdAt),
                    updatedAt: convertFromStringToDate(each.updatedAt),

                }
            }))
        })
    }, [garage?.id])
    return (
        <div className={"flex flex-col gap-2 w-full"}>
            <div className={"flex w-full justify-between gap-2 flex-wrap"}>
                <div
                    className={"rounded-3xl items-center text-white justify-evenly bg-primary w-[443px] h-[224.5px] flex flex-col"}>
                <span>
                    Exited vehicle
                </span>
                    <p className={"text-6xl"}>
                        559
                    </p>
                </div>
                <div
                    className={"border-2 border-primary rounded-3xl items-center text-primary justify-evenly bg-white w-[443px] h-[224.5px] flex flex-col"}>
                    <span>
                        Available slots
                    </span>
                    <p className={"text-6xl"}>
                        {(garage?.slots || 0) - (garage?.takenSlots || 0)}
                    </p>
                </div>

            </div>

            <CarsTable vehicles={vehicles} garage={garage}/>
        </div>

    )
}

export default GarageSpaceActivity