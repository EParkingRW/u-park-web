import React from 'react';
import DataProvider from "./DataContext";

const AppProviders = ({ children }: any) => {
    return (
        <DataProvider>{children}</DataProvider>
    );
};

export default AppProviders;
