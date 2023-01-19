import React from "react";
import vehicleInterface from "../../../../../interfaces/vehicle.interface";
import {garageShape} from "../../../../context/DataContext";
import {getGarageMoreInfo} from "../../../../../utils/functions";

const CarsTable = ({vehicles,garage}:{vehicles:vehicleInterface[], garage?:garageShape | null}) => {
    return(
        <div className={"w-full flex flex-col bg-[#FFE3E6] rounded-2xl p-5"}>
            <div className={"flex justify-between text-primary"}>
                <h3 className={"text-3xl "}>All cars</h3>
                <div id={"filters"} className={"flex gap-2"}>
                    {/*<div className={"cursor-pointer flex items-center"}>
                        <span className="material-symbols-outlined">sort</span>
                        <span>Sort</span>
                    </div>
                    <div className={"cursor-pointer flex items-center"}>
                        <span className="material-symbols-outlined">filter_alt</span>
                        <span>Filter</span>
                    </div>*/}
                </div>
            </div>
            <table className="table-auto w-full border-collapse mt-20">
                <thead className={"text-white/70 bg-primary/50 "}>
                <tr>
                    <th className={"p-3 font-bold uppercase border border-gray-300 hidden lg:table-cell"}>Plate number</th>
                    <th className={"p-3 font-bold uppercase  border border-gray-300 hidden lg:table-cell"}>Entrance time</th>
                    <th className={"p-3 font-bold uppercase  border border-gray-300 hidden lg:table-cell"}>total min</th>
                    <th className={"p-3 font-bold uppercase  border border-gray-300 hidden lg:table-cell"}>Money</th>
                    <th className={"p-3 font-bold uppercase  border border-gray-300 hidden lg:table-cell"}>Status</th>



                </tr>
                </thead>
                <tbody className={"text-primary"}>
                {
                    vehicles.map(each => {
                        let moreInfo = getGarageMoreInfo(each,garage)
                        return (
                            <tr key={each.id} className={"bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"}>
                                <td className={"w-full lg:w-auto p-3 text-center border border-b block lg:table-cell relative lg:static"}>
                                    <div className={"flex flex-col"}>
                                        <span >{each.plateText}</span>
                                        <span className={"text-gray_light"}>3 min ago</span>
                                    </div>

                                </td>
                                <td className={"w-full lg:w-auto p-3 text-center border border-b block lg:table-cell relative lg:static"}>
                                    <div className={"flex flex-col"}>
                                        <span>{moreInfo?.EntranceTime}</span>
                                        <span className={"text-gray_light"}>on {each.createdAt.toDateString()}</span>
                                    </div>

                                </td>
                                <td className={"w-full lg:w-auto p-3 text-center border border-b block lg:table-cell relative lg:static"}>
                                    <div className={"flex flex-col"}>
                                        <span>{moreInfo?.totalMin.toFixed(1)} min</span>
                                        <span className={"text-gray_light"}>{moreInfo?.inHours}</span>
                                    </div>

                                </td>
                                <td className={"w-full lg:w-auto p-3 text-center border border-b block lg:table-cell relative lg:static"}>
                                    <span className={"p-2 rounded-2xl border-primary border-2"}>{moreInfo?.money} rwf</span>
                                </td>
                                <td className={"w-full lg:w-auto p-3 text-center border border-b block lg:table-cell relative lg:static"}>
                                    <span className={"p-2 rounded-2xl bg-primary text-white border-2"}>{each.isInside?"Inside":"Outside"}</span>
                                </td>


                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>

    )
}

export default CarsTable