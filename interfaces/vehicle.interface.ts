interface vehicleInterface{
    createdAt:Date,
    garageId:string,
    id:string,
    imageUrl:string,
    isInside: boolean,
    plateText:string,
    updatedAt:Date
}
export interface vehicleInterfaceBackend{
    createdAt:string,
    garageId:string,
    id:string,
    imageUrl:string,
    isInside: boolean,
    plateText:string,
    updatedAt:string
}


export default vehicleInterface;