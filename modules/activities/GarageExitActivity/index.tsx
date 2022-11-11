const GarageExitActivity = () => {
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
                <div className={"h-full flex  flex-col w-full justify-center items-center text-white px-6 gap-3"}>
                    <div className={"rounded-2xl justify-center items-center flex w-[331px] relative h-[176px] flex-col bg-gradient-to-r from-[#C32C7C] to-[#850334]"}>
                        <p>Entrance time</p>
                        <p className={"text-6xl"}>0:29</p>
                        <p>On 23.06.2022</p>
                    </div>
                    <div className={"rounded-2xl justify-center items-center flex w-[331px] relative h-[176px] flex-col bg-gradient-to-r from-cyan-500 to-blue-500"}>
                        <p>Computed cash</p>
                        <p className={"text-6xl"}>300</p>
                        <p>Rwf</p>
                    </div>
                    <div className={"rounded-2xl justify-center items-center flex w-[331px] relative h-[176px] flex-col bg-gradient-to-r from-[#C32C7C] to-[#850334]"}>
                        <p>Hours</p>
                        <p className={"text-6xl"}>3.1</p>
                        <p>186 min</p>
                    </div>


                </div>
            </div>
        </div>

    )
}

export default GarageExitActivity