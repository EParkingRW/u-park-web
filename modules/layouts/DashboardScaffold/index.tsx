import React from "react";
import TopNavDashboard from "../../../components/TopNavDashboard";

const Scaffold = ({ children }: { children: any }) => {
    return (
        <>
            <TopNavDashboard />
            <div>
                {children}
            </div>


        </>
    );
};

export default Scaffold;
