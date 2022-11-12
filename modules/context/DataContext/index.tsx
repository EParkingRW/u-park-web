import React from "react";
import Secure from "../../../system/helpers/secureLs";
import Keys from "../../../system/constants/keys";

export interface profileData{
    active: boolean
    createdAt: string
    dateOfBirth: string
    email: string
    fullName: string
    gender: string
    id: string
    phoneNumber: string
    status: number
    updatedAt: string
    userName: string
}
export interface dataShape {
    profile:profileData|undefined,
    setProfile:React.Dispatch<React.SetStateAction<any>>
}
export const defaultValue: Readonly<dataShape> = {
    profile: undefined,
    setProfile(){}
};
export const useData = () => {
    return React.useContext(DataContext);
};

export const DataContext = React.createContext<dataShape>(defaultValue);

const DataProvider = ({children}:any) =>{
    const [profile, setProfile] = React.useState(undefined)

    React.useEffect(() =>{
        const user = Secure.get(Keys.USER_INFO as string);
        if (user) {
            setProfile((prev: any) => {
                if (!prev) {
                    return user;
                }
                return prev;
            });
        }
    }, [])

    const value = React.useMemo(()=>{
        return {
            profile,setProfile
        }
    }, [profile])

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider