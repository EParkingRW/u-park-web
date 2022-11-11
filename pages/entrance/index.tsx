import DashboardScaffold from "../../modules/layouts/DashboardScaffold";
import SideNavigation from "../../components/SideNavigation";
import GarageEntranceActivity from "../../modules/activities/GarageEntranceActivity";

const garageEntrance = () => {
    return <>
        <header>
            <title>
                Entrance
            </title>
        </header>
        <DashboardScaffold>
            <div className={"flex justify-between gap-5"}>
                <GarageEntranceActivity/>
                <SideNavigation/>
            </div>

        </DashboardScaffold>

    </>
}

export default garageEntrance