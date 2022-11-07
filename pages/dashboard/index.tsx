import DashboardScaffold from "../../modules/layouts/DashboardScaffold";
import DashboardActivity from "../../modules/activities/DashboardActivity";

const DashboardPage = () => {
    return <>
        <header>
            <title>
                Dashboard
            </title>
        </header>
        <DashboardScaffold>
            <DashboardActivity/>
        </DashboardScaffold>

    </>
}

export default DashboardPage