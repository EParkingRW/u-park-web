import vehicleInterface from "../../../interfaces/vehicle.interface";
import Image from "next/image";
import {garageShape} from "../../context/DataContext";
import {getGarageMoreInfo} from "../../../utils/functions";

const GarageExitActivity = ({recentVehicleOut, garage}: { recentVehicleOut: vehicleInterface | null, garage:garageShape|null }) => {
    let moreInfo = getGarageMoreInfo(recentVehicleOut, garage);
    function computeCash(){
        return moreInfo?.money
    }
    function computeHours(){
        return moreInfo?.inHours
    }
    function computeMinutes(){
        return moreInfo?.totalMin.toFixed(2)
    }
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
            <h3 className={"text-primary text-3xl"}>
                Recent car /Entrance
            </h3>
            {
                recentVehicleOut ? (
                    <div className={"w-full flex gap-2 bg-[#FFE3E6] rounded-xl items-center justify-evenly px-3 py-3"}>
                        <div className="max-w-sm bg-primary/30 rounded-xl overflow-hidden shadow-lg">
                            <Image src={recentVehicleOut?.imageUrl || ""} alt="" width={400} height={200}/>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{recentVehicleOut?.plateText}</div>
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                <span
                                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{recentVehicleOut?.createdAt.toDateString()}</span>
                            </div>
                        </div>
                        <div className={"h-full flex flex-col justify-center items-center text-white px-6 gap-3"}>
                            <div
                                className={"rounded-2xl justify-center items-center flex w-[331px] relative h-[176px] flex-col bg-gradient-to-r from-[#C32C7C] to-[#850334]"}>
                                <p>Entrance time</p>
                                <p className={"text-6xl"}>{
                                    recentVehicleOut?.createdAt.getHours()}
                                    :{recentVehicleOut?.createdAt.getMinutes()}</p>
                                <p>{recentVehicleOut?.createdAt.toDateString()}</p>
                            </div>
                            <div
                                className={"rounded-2xl justify-center items-center flex w-[331px] relative h-[176px] flex-col bg-gradient-to-r from-cyan-500 to-blue-500"}>
                                <p>Computed cash</p>
                                <p className={"text-6xl"}>{computeCash()}</p>
                                <p>Rwf</p>
                            </div>
                            <div
                                className={"rounded-2xl justify-center items-center flex w-[331px] relative h-[176px] flex-col bg-gradient-to-r from-[#C32C7C] to-[#850334]"}>
                                <p>Hours</p>
                                <p className={"text-6xl"}>{computeHours()}</p>
                                <p>{computeMinutes()} min</p>
                            </div>


                        </div>
                    </div>
                ):(<div className="w-full rounded-xl text-center">
                    No recent car
                </div>)
            }
        </div>

    )
}

export default GarageExitActivity