import DashboardScaffold from "../../modules/layouts/DashboardScaffold";
import SideNavigation from "../../components/SideNavigation";
import GarageSpaceActivity from "../../modules/activities/GarageSpaceActivity";

const garageSpace = () => {
    return <>
        <header>
            <title>
                garge space
            </title>
        </header>
        <DashboardScaffold>
            <div className={"flex justify-between gap-5"}>
                <GarageSpaceActivity/>
                <SideNavigation/>
            </div>

        </DashboardScaffold>

    </>
}

export default garageSpace