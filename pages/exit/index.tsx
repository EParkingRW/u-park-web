import DashboardScaffold from "../../modules/layouts/DashboardScaffold";
import SideNavigation from "../../components/SideNavigation";
import GarageExitActivity from "../../modules/activities/GarageExitActivity";

const garageEntrance = () => {
    return <>
        <header>
            <title>
                Exit
            </title>
        </header>
        <DashboardScaffold>
            <div className={"flex justify-between gap-5"}>
                <GarageExitActivity/>
                <SideNavigation/>
            </div>

        </DashboardScaffold>

    </>
}

export default garageEntrance