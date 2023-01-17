import DashboardScaffold from "../../modules/layouts/DashboardScaffold";
import DashboardActivity from "../../modules/activities/DashboardActivity";
import {useEffect, useState} from "react";

const DashboardPage = () => {
    const [searchText, setSearchText] = useState("");
    return <>
        <header>
            <title>
                Dashboard
            </title>
        </header>
        <DashboardScaffold setSearchText={setSearchText}>
            <DashboardActivity searchText={searchText}/>
        </DashboardScaffold>

    </>
}
export const getServerSideProps = () => {
    return {
        props: {
            protected: true,
        },
    };
};

export default DashboardPage