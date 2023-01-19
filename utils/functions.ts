import vehicleInterface from "../interfaces/vehicle.interface";
import {garageShape} from "../modules/context/DataContext";

export function convertFromStringToDate(responseDate:string) {
    const date = new Date(responseDate.replace(' ', 'T'));
    return(date)
}
export function validatePhoneNumber(input_str:string) {
    let re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

    return re.test(input_str);
}
export function getFormFromObject(data: any) {
    const formData = new FormData();
    if (!data) {
        return null;
    }
    Object.keys(data).forEach(eachKey => {
        if (Array.isArray(data[eachKey])) {
            data[eachKey].forEach((each: any) => formData.append(eachKey, each));
        } else {
            formData.append(eachKey, data[eachKey]);
        }
    });
    return formData;
}
export function getGarageMoreInfo(vehicle:vehicleInterface|null,garage?:garageShape|null){
    if(!garage || !vehicle){
        return null
    }
    const entranceDate = vehicle.createdAt
    ;
    let exitedDate:Date = vehicle.updatedAt
    if(entranceDate.toString() === exitedDate.toString()){
        exitedDate = new Date();
    }

    let difference= Math.abs(exitedDate.getTime()-entranceDate.getTime());
    let min:number = (difference/(1000 * 60))
    let h = Math.floor(min / 60);
    let m = Math.floor(min % 60);
    let inHours = h+" : "+m +" h";
    let moneyToPay = Math.round(h*garage.hourlyFee)
    moneyToPay = moneyToPay > garage.hourlyFee ? moneyToPay : garage.hourlyFee

    let EntranceDateFormed = entranceDate.getDate()+"."+(entranceDate.getMonth()+1)+"."+entranceDate.getFullYear();
    let EntranceTime = entranceDate.getHours()+": "+ entranceDate.getMinutes();

    let ExitedDateFormed = exitedDate.getDate()+"."+(exitedDate.getMonth()+1)+"."+exitedDate.getFullYear();
    let ExitedTime = entranceDate.getHours()+": "+exitedDate.getMinutes();

    return {
        "EntranceTime":EntranceTime,
        "EntranceDate":EntranceDateFormed,
        "ExitedDate":ExitedDateFormed,
        "ExitedTime":ExitedTime,
        totalMin:min,
        inHours:inHours,
        money:moneyToPay
    }
}