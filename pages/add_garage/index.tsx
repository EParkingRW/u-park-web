import DashboardScaffold from "../../modules/layouts/DashboardScaffold";
import AddGarageActivity from "../../modules/activities/AddGarageActivity";

const AddGaragePage = () => {
    return <>
        <header>
            <title>
                add Parking
            </title>
        </header>
        <DashboardScaffold>
            <AddGarageActivity/>
        </DashboardScaffold>

    </>
}

export default AddGaragePage