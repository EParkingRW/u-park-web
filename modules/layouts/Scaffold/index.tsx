import React from 'react';
import TopNav from "../../../components/TopNav";

const Scaffold = ({ children }: { children: any }) => {
  return (
    <>
        <div>
            {children}
        </div>
        <TopNav />

    </>
  );
};

export default Scaffold;
