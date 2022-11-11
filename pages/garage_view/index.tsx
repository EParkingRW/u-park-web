import DashboardScaffold from "../../modules/layouts/DashboardScaffold";
import GarageViewActivity from "../../modules/activities/GarageViewActivity";
import SideNavigation from "../../components/SideNavigation";

const garageView = () => {
    return <>
        <header>
            <title>
                Garage view
            </title>
        </header>
        <DashboardScaffold>
            <div className={"flex gap-5"}>
                <GarageViewActivity/>
                <SideNavigation/>
            </div>

        </DashboardScaffold>

    </>
}

export default garageView