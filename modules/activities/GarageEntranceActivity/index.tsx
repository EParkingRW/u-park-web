const GarageEntranceActivity = () => {
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
                Recent car
            </h3>
            <div className={"w-full flex gap-2 bg-[#FFE3E6] rounded-xl items-center px-3 py-3"}>
                <div className={"h-96 bg-red-800 w-full rounded-2xl"}>

                </div>
            </div>
        </div>

    )
}

export default GarageEntranceActivity