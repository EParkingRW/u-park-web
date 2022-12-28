import React, {useEffect, useState} from "react";
import Secure from "../../../system/helpers/secureLs";
import Keys from "../../../system/constants/keys";
import axios from "axios";
import Constants from "../../../system/constants";
import io from "socket.io-client";
import constants from "../../../system/constants";
import {convertFromStringToDate} from "../../../utils/functions";
import config from "../../../system/constants/config";

export interface garageShape{
    name: string,
    address: string,
    latitude:number,
    longitude:number,
    hourlyFee: number,
    openingTime: string,
    closingTime: string,
    description: string,
    slots: number,
    imageUrl:string,
    id:string,
    takenSlots:number,
    userId:string,
    createdAt:string,
}
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
    garages:garageShape[],
    setGarages:React.Dispatch<React.SetStateAction<garageShape[]>>,
    setProfile:React.Dispatch<React.SetStateAction<any>>
}
export const defaultValue: Readonly<dataShape> = {
    profile: undefined,
    garages:[],
    setGarages(){},
    setProfile(){}
};
export const useData = () => {
    return React.useContext(DataContext);
};

export const DataContext = React.createContext<dataShape>(defaultValue);

const DataProvider = ({children}:any) =>{
    // @ts-ignore
    const socket = io(constants.BACKEND_URL);

    const [exitCar, setExitCar] = useState<any>(null);
    const [entranceCar, setEntranceCar] = useState<any>(null);
    const [elapsedTime, setElapsedTime] = useState<any>(0);
    const [allCars, setAllCars] = useState<any>([])
    const [carsIn, setCarsIn] = useState<any>([])
    const [payedByCash, setPayedByCash] = useState<any>({});
    const [payedByMomo, setPayedByMomo] = useState<any>({});
    const [lastPaymentStatus, setLastPaymentStatus] = useState<any>({})
    const [profile, setProfile] = useState<any>(undefined)
    const [garages, setGarages] = useState<garageShape[]>([])

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
    React.useEffect(()=>{
        axios.get(Constants.BACKEND_URL + Constants.endpoints.GARAGES).then(response => {
            if(response.status === 200){
                let {data:{data:{rows}}} = response
                setGarages([...rows])
                console.log(rows)
            }
        }).catch(error => {
            console.error(error)
        })
    },[])

    function addMoreField(each:any) {
        let EntranceDateFormed:any = null;
        let ExitedDateFormed:any = null;
        let EntranceTime:any = null;
        let ExitedTime:any = null;
        let min:any = null;
        let moneyToPay:any = null;
        let inHours:any = null;
        try {
            const entranceDate:any = convertFromStringToDate(each.createdAt);
            let exitedDate:any = convertFromStringToDate(each.exitedAt);
            if(entranceDate.toString() === exitedDate.toString()){
                exitedDate = Date.now()
            }
            let difference= Math.abs(exitedDate-entranceDate);
            min = (difference/(1000 * 60)).toFixed(2)

            let h = Math.floor(min / 60);
            let m = Math.floor(min % 60);
            inHours = h+" : "+m +" h";
            moneyToPay = Math.round(min*config.paymentRate)
            moneyToPay = moneyToPay > config.minimumMoneyToPay ? moneyToPay : config.minimumMoneyToPay

            EntranceDateFormed = entranceDate.getDate()+"."+(entranceDate.getMonth()+1)+"."+entranceDate.getFullYear();
            EntranceTime = entranceDate.getHours()+": "+ entranceDate.getMinutes();

            ExitedDateFormed = exitedDate.getDate()+"."+(exitedDate.getMonth()+1)+"."+exitedDate.getFullYear();
            ExitedTime = entranceDate.getHours()+": "+exitedDate.getMinutes();
        }catch (e) {

        }finally {
            return{
                ...each, "EntranceTime":EntranceTime,
                "EntranceDate":EntranceDateFormed,
                "ExitedDate":ExitedDateFormed,
                "ExitedTime":ExitedTime,
                totalMin:min,
                inHours:inHours,
                money:moneyToPay
            }
        }
    }
    const loadCars = () => {
        return axios.get(constants.BACKEND_URL+"/api/v1/vehicles")
            .then(function (response) {
                if(response.status === 201 || response.status === 200){
                    console.log("inside state")
                    console.log(response.data.data.data);

                    return {payload: [...response.data.data.data], status: Constants.status.DONE}
                }
                else {
                    return {payload: [response.data], status: Constants.status.ERROR}
                }

            }).then((output) => {
                return {...output}
            })
            .catch(function (error) {
                console.log("before error")
                console.log(error)
                return {payload: {...error.response}, status: constants.status.ERROR}
            });
    }
    const carsInRange = (from:any, to:any) => {
        return axios.post(Constants.BACKEND_URL+"/api/v1/vehicles/range", {startingDate:from, endingDate:to})
            .then(function (response) {
                if(response.status === 201 || response.status === 200){
                    console.log("inside state")
                    console.log(response.data.data.data);
                    let config3 = {
                        method: 'get',
                        url: `${Constants.BACKEND_URL}/api/v1/payment/all/momo?startingDate=${from}&endingDate=${to}`,
                        headers: { }
                    };

                    axios(config3)
                        .then(function (response) {
                            if(response.status === 200 || response.status === 201){
                                setPayedByMomo({...response.data.data})
                            }

                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    let config2 = {
                        method: 'get',
                        url: `${Constants.BACKEND_URL}/api/v1/payment/all/cash?startingDate=${from}&endingDate=${to}`,
                        headers: { }
                    };

                    axios(config2)
                        .then(function (response) {
                            if(response.status === 200 || response.status === 201){
                                setPayedByCash({...response.data.data})
                            }

                        })
                        .catch(function (error) {
                            console.log(error);
                        });



                    return {payload: [...response.data.data.data], status: Constants.status.DONE}
                }
                else {
                    return {payload: [response.data], status: Constants.status.ERROR}
                }

            }).then((output) => {
                return {...output}
            }).then(data => {
                console.log(data)
                let all = []
                try {
                    all = data?.payload?.map(each => {
                        return addMoreField(each);

                    })
                }catch (e) {
                }


                return [...all]
            })
            .catch(function (error) {
                console.log("before error")
                console.log(error)
                return {payload: {...error.response}, status: Constants.status.ERROR}
            });
    }

    useEffect(() => {
        // loadCars().then(data => {
        //     console.log("inside clients")
        //     console.log(data)
        //     let all:any = []
        //     try {
        //         all = data?.payload?.map((each:any) => {
        //             return addMoreField(each);
        //
        //         })
        //     }catch (e) {
        //     }
        //
        //
        //     setAllCars([...all])
        // })
    },[])
    useEffect(() => {
        // if(allCars.length !== 0){
        //     allCars.forEach((each:any) => {
        //         if(each.isInside){
        //             let found = false;
        //             carsIn.forEach((eachIn:any) => {
        //                 if(each.plateText === eachIn.plateText){
        //                     found = true;
        //                 }
        //             });
        //             if(!found){
        //                 setCarsIn([...carsIn, {...each}])
        //             }
        //         }
        //     })
        // }
    },[allCars])
    useEffect(() => {
        // if(exitCar !== null){
        //     let newArray:any = [];
        //     carsIn.forEach((each:any) => {
        //         if(each.plateText !== exitCar.plateText){
        //             newArray.push(each)
        //         }
        //     });
        //     setCarsIn(newArray)
        // }
    }, [exitCar])
    useEffect(() => {
        // setAllCars([...allCars, addMoreField(entranceCar)])
    },[entranceCar])

    // useEffect(() => {
    //     // const socket = io(config.backendURL);
    //     socket.on("connection", () => console.log("connected"));
    //     socket.on("disconnect", () => console.log("disconnected"));
    //     socket.on("data", (data) => {
    //         console.log(data);
    //         setEntranceCar({...data.data})
    //         setElapsedTime(0);
    //     });
    //
    //
    // },[socket])

    // useEffect(() => {
    //     // const socket = io(config.backendURL);
    //     socket.on("connection", () => console.log("connected"));
    //     socket.on("disconnect", () => console.log("disconnected"));
    //     socket.on("exit", (data) => {
    //         console.log(data.data);
    //         setExitCar({...data.data})
    //     });
    //     const date = convertFromStringToDate("2022-05-12T12:30:41.813Z")
    //     console.log("date")
    //     console.log(date.getDay())
    //
    //
    // },[socket])
    useEffect(() => {
        // const socket = io(config.backendURL);
        socket.on("connection", () => console.log("connected"));
        socket.on("disconnect", () => console.log("disconnected"));
        socket.on("payment", (data) => {
            console.log("payment",data);
            // setLastPaymentStatus(data);
        });
        socket.on("garage", (data) => {
            let {data:newGarage} = data;
            let oldGarages = garages.filter(each => each.id !== newGarage.id);
            setGarages([...oldGarages, newGarage])
            console.log("new garage", newGarage);
        });
        socket.on("exit", (data) => {
            console.log("exit socket", data);
            // setExitCar({...data.data})
        });
        socket.on("data", (data) => {
            console.log("data", data);
            // setEntranceCar({...data.data})
            // setElapsedTime(0);
        });
        socket.emit("join", "GarageRoom");
        socket.on('GarageRoom', (data) => {
            console.log("soketttt----::: ",data);
        });
        // const date = convertFromStringToDate("2022-05-12T12:30:41.813Z")
        // console.log("date")
        // console.log(date.getDay())


    },[socket])
    // useEffect(() => {
    //     // const socket = io(config.backendURL);
    //     socket.on("connection", () => console.log("connected"));
    //     socket.on("disconnect", () => console.log("disconnected"));
    //     socket.on("garage", (data) => {
    //         console.log("new garage", data);
    //     });
    //     // const date = convertFromStringToDate("2022-05-12T12:30:41.813Z")
    //     // console.log("date")
    //     // console.log(date.getDay())
    //
    //
    // },[socket])




    const value = React.useMemo(()=>{
        return {
            profile,setProfile,garages, setGarages
        }
    }, [profile,garages])

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider