import CarsTable from "./parties/CarsTable";
import {garageShape} from "../../context/DataContext";

const GarageSpaceActivity = ({garage}:{garage:garageShape|null}) => {
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

            <CarsTable/>
        </div>

    )
}

export default GarageSpaceActivity