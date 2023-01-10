import {garageShape} from "../../../../context/DataContext";

const GarageDashboard = ({garage}:{garage:garageShape|null}) => {
    return <div className={"flex w-full justify-between gap-2 flex-wrap"}>
        <div className={"rounded-3xl items-center text-white justify-evenly bg-primary w-[443px] h-[224.5px] flex flex-col"}>
        <span>
            Available Slots
        </span>
            <p className={"text-6xl"}>
                {(garage?.slots || 0) - (garage?.takenSlots || 0) }/{garage?.slots}
            </p>
        </div>
        <div className={"border-2 border-primary rounded-3xl items-center text-primary justify-evenly bg-white w-[443px] h-[224.5px] flex flex-col"}>
        <span>
            Total vehicles in
        </span>
            <p className={"text-6xl"}>
                {garage?.takenSlots}
            </p>
        </div>

    </div>
}

export default GarageDashboard;