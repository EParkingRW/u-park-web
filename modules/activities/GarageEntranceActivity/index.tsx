import vehicleInterface from "../../../interfaces/vehicle.interface";
import Image from "next/image";

const GarageEntranceActivity = ({recentVehicleIn}:{recentVehicleIn:vehicleInterface | null}) => {
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
                        Total vehicles in
                    </span>
                    <p className={"text-6xl"}>
                        12
                    </p>
                </div>

            </div>
            <h3 className={"text-primary text-3xl"}>
                Recent car /Entrance
            </h3>
            {
                recentVehicleIn ? (
                    <div className={"w-full flex gap-2 bg-[#FFE3E6] rounded-xl items-center px-3 py-3"}>
                        <div className={"h-96 bg-red-800 w-full rounded-2xl relative flex flex-wrap"}>
                            <Image width={400} height={200} src={recentVehicleIn?.imageUrl || ""} alt={""}/>

                            <div className="flex flex-col ga-5 flex-1 self-center pr-5">
                                <div className="w-full max-w-[500px] mx-auto py-12 text-white text-center rounded-xl bg-primary self-start">
                                    <p>Plate number</p>
                                    <p>{recentVehicleIn?.plateText}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    ):(
                    <div className="w-full rounded-xl text-center">
                        No recent car
                    </div>
                )
            }
        </div>

    )
}

export default GarageEntranceActivity