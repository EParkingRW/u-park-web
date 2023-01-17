import React from "react";
import TopNavDashboard from "../../../components/TopNavDashboard";

const Scaffold = ({ children,setSearchText }: { children: any, setSearchText?:(searchTxt:string)=>void }) => {
    return (
        <div className={"mx-5 flex flex-col h-screen"}>
            <TopNavDashboard setSearchText={setSearchText} />
            <div className={"mt-5 h-full"}>
                {children}
            </div>


        </div>
    );
};

export default Scaffold;
