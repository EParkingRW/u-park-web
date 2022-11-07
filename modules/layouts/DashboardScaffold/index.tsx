import React from "react";
import TopNavDashboard from "../../../components/TopNavDashboard";

const Scaffold = ({ children }: { children: any }) => {
    return (
        <div className={"mx-5"}>
            <TopNavDashboard />
            <div className={"mt-5"}>
                {children}
            </div>


        </div>
    );
};

export default Scaffold;
