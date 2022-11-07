import React from "react";
import TopNavDashboard from "../../../components/TopNavDashboard";

const Scaffold = ({ children }: { children: any }) => {
    return (
        <div className={"mx-5 flex flex-col h-screen"}>
            <TopNavDashboard />
            <div className={"mt-5 h-full"}>
                {children}
            </div>


        </div>
    );
};

export default Scaffold;
