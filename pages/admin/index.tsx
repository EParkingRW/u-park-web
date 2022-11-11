import DashboardScaffold from "../../modules/layouts/DashboardScaffold";
import AdminActivity from "../../modules/activities/AdminActivity";

const DashboardPage = () => {
    return <>
        <header>
            <title>
                Dashboard
            </title>
        </header>
        <DashboardScaffold>
            <AdminActivity/>
        </DashboardScaffold>

    </>
}

export default DashboardPage