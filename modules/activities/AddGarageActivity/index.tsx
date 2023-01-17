import React, {useEffect, useState} from "react";
import GoogleMapReact, {Coords} from "google-map-react";
import UploadImage from "../../../components/UploadImage";
import joi from "joi";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {formatJoiErorr} from "../../../system/format";
import axios from "axios";
import Constants from "../../../system/constants";
import {getHeaders} from "../../../system/constants/config";
import FormData from "form-data";
import swal from "sweetalert";

const fields = {
    name: joi.string().required(),
    address: joi.string().required(),
    latitude:joi.number().required().not(0),
    longitude:joi.number().required().not(0),
    hourlyFee: joi.number().required(),
    openingTime: joi.number().required(),
    closingTime: joi.number().required(),
    description: joi.string().required(),
    slots: joi.number().required(),
    image:joi.object().required(),
};
const schema = joi.object(fields);

const MapView = ({latitude,longitude, setCoordinate, currentLocation, setCurrentLocation}:
                     {latitude:(number|undefined),longitude:(number|undefined),setCoordinate:Function, currentLocation:Coords,setCurrentLocation:Function}) => {
    const defaultProps = {
        zoom: 14
    };
    const AnyReactComponent = ({ text }:any) => (
        <div style={{
            color: 'white',
            background: 'grey',
            padding: '15px 10px',
            display: 'inline-flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '100%',
            transform: 'translate(-50%, -50%)'
        }}>
            {text}
        </div>
    );
    const handleApiLoaded = (map:any, maps:any) => {
        navigator?.geolocation.getCurrentPosition(
            ({ coords: { latitude: lat, longitude: lng } }) => {
                const pos = { lat, lng };
                setCurrentLocation(pos)
            }
        );
    };
    return <div className={"w-full h-full overflow-hidden rounded-3xl"}>
        <GoogleMapReact
            onClick={(e) => {
                console.log("error")
                console.log("lat " + e.lat +"  long "+ e.lng)
                setCoordinate(e.lat, e.lng)
            }}
            bootstrapURLKeys={{ key:process.env.GOOGLE_MAP_KEY as string}}
            defaultZoom={defaultProps.zoom}
            yesIWantToUseGoogleMapApiInternals
            defaultCenter={currentLocation}
            onGoogleApiLoaded={({ map, maps }:any) => handleApiLoaded(map, maps)}
        >
            {
                latitude && longitude ?
                    <AnyReactComponent
                    lat={latitude}
                    lng={longitude}
                    text="My Marker"
                />:null
            }
        </GoogleMapReact>
    </div>
}
const SecondForm = ({register, errors, setValue}:{register:Function, errors:any, setValue:Function}) => {
    const [files, setFiles] = useState([])
    useEffect(() => {
        if(!files[0]) {
            return
        }
        setValue("image", files[0])
    }, [files, setValue])
    const hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
    return (
        <div className={"w-full h-full flex flex-col justify-center px-2 md:px-10 xl:px-96"}>
            <label className={"flex flex-col"}>
            <span>
                Image
            </span>
                {errors.image?.message && (
                    <p className="mt-1 text-red-500">
                        {formatJoiErorr(`${errors.image.message}`)}
                    </p>
                )}
                <UploadImage updateFilesCb={setFiles} multiple={false}/>
            </label>
            <label className={"flex flex-col"}>
            <span>
                Hour fees
            </span>
                {errors.hourlyFee?.message && (
                    <p className="mt-1 text-red-500">
                        {formatJoiErorr(`${errors.hourlyFee.message}`)}
                    </p>
                )}
                <input {...register("hourlyFee")} type={"number"} className={"p-4 rounded-xl w-full bg-[#DEE7FF]"} placeholder={"600"}/>
            </label>
            <div className={"flex justify-between gap-5"}>
                <label className={"flex flex-col w-full"}>
                    <span>
                        Start time
                    </span>
                    {errors.openingTime?.message && (
                        <p className="mt-1 text-red-500">
                            {formatJoiErorr(`${errors.openingTime.message}`)}
                        </p>
                    )}
                    <select {...register("openingTime")} className={"p-4 rounded-xl w-full bg-[#DEE7FF]"}>
                        {hours.map(hour => <option key={"hour_"+hour} value={hour} className={""}>{hour}</option>)}
                    </select>
                </label>
                <label className={"flex flex-col w-full"}>
                    <span>
                        End time
                    </span>
                    {errors.closingTime?.message && (
                        <p className="mt-1 text-red-500">
                            {formatJoiErorr(`${errors.closingTime.message}`)}
                        </p>
                    )}
                    <select {...register("closingTime")} className={"p-4 rounded-xl w-full bg-[#DEE7FF]"}>
                        {hours.map(hour => <option key={"hour_"+hour} value={hour} className={""}>{hour}</option>)}
                    </select>
                </label>

            </div>
            <label className={"flex flex-col"}>
            <span>
                Slots
            </span>
                {errors.slots?.message && (
                    <p className="mt-1 text-red-500">
                        {formatJoiErorr(`${errors.slots.message}`)}
                    </p>
                )}
                <input {...register("slots")} type={"number"} className={"p-4 rounded-xl w-full bg-[#DEE7FF]"} placeholder={"300"}/>
            </label>
            <button type={"submit"} className={"px-12 bg-primary py-2 mt-2 md:mt-20 text-white rounded-2xl self-center"}>Save</button>

    </div>
    )
}
const FirstForm = ({register,errors}:{register:Function, errors:any}) => {
    return <div className={"w-full h-full flex flex-col justify-center px-2 md:px-10 xl:px-96"}>
        <label className={"flex flex-col"}>
            <span>
                Name
            </span>
            {errors.name?.message && (
                <p className="mt-1 text-red-500">
                    {formatJoiErorr(`${errors.name.message}`)}
                </p>
            )}
            <input {...register("name")} type={"text"} className={"p-4 rounded-xl w-full bg-[#DEE7FF]"} placeholder={"ABC parking slot"}/>
        </label>
        <label className={"flex flex-col"}>
            <span>
                Address
            </span>
            {errors.address?.message && (
                <p className="mt-1 text-red-500">
                    {formatJoiErorr(`${errors.address.message}`)}
                </p>
            )}
            <input {...register("address")} type={"text"} className={"p-4 rounded-xl w-full bg-[#DEE7FF]"} placeholder={"KV 121 c, kiyovu"}/>
        </label>
        <label className={"flex flex-col"}>
            <span>
                Description
            </span>
            {errors.description?.message && (
                <p className="mt-1 text-red-500">
                    {formatJoiErorr(`${errors.description.message}`)}
                </p>
            )}
            <textarea {...register("description")} rows={5} className={"p-4 rounded-xl w-full bg-[#DEE7FF]"} placeholder={"KV 121 c, kiyovu"}/>
        </label>


    </div>
}

const AddGarageActivity = () => {
    const [current_content, setCurrent_content] = useState(0)
    const [latitude, setLatitude] = useState<number>(0)
    const [longitude, setLongitude] = useState<number>(0)
    const [currentLocation, setCurrentLocation] = useState({ lat: -1.9580392673301357, lng: 30.069174678417752 })

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(schema),
    });

    function getFormFromObject(data : any){
        let formData = new FormData()
        if(!data){
            return null
        }
        Object.keys(data).forEach(eachKey => {
            formData.append(eachKey, data[eachKey])
        })
        return formData
    }
    const onSubmit = async (query: any) => {
        let formData:any = getFormFromObject({...query, openingTime:query.openingTime+":00", closingTime:query.closingTime+":00"})

        axios.post(Constants.BACKEND_URL + Constants.endpoints.GARAGES,
            formData, getHeaders()).then(response => {
                const {data:{data:garage}} = response
            swal('Garage created successful!', `${garage?.name} is created`, 'success');
                console.log("response", garage)

        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.error(error)
        })

    }
    useEffect(() => {
        if(latitude && latitude !==0){
            errors.latitude = undefined
        }
        setValue("latitude", latitude)
    }, [errors, latitude, setValue])
    useEffect(() => {
        if(longitude && longitude !==0){
            errors.longitude = undefined
        }
        setValue("longitude", longitude)
    }, [errors, longitude, setValue])


    const setCoordinate = (lat:number, long:number) => {
        setLatitude(lat)
        setLongitude(long)
    }
    return <>
    <div className={"flex flex-col md:flex-row md:gap-10 gap-2 h-full items-center"}>
        <form id={"forms"} className={" w-full h-[90%] min-h-[500px]"}
              onSubmit={event => {handleSubmit(onSubmit)(event);}}>
            <div id={"mad_choosing_id"} className={"overflow-hidden w-full "+ (current_content === 0? "animate-h-in":"animate-h-out")}>

                <div className={"flex justify-between"}>
                    <label>Garage location</label>
                    <label>
                        {errors.latitude?.message && (
                            <p className="mt-1 text-red-500">
                                {formatJoiErorr(`${errors.latitude.message}`)}
                            </p>
                        )}
                        <div>
                            <span>Latitude: </span>
                            <input {...register("latitude")}  value={latitude} disabled={true} onChange={(e:any) => setLatitude(e.type.value)}/>
                        </div>

                    </label>
                    <label>
                        {errors.longitude?.message && (
                            <p className="mt-1 text-red-500">
                                {formatJoiErorr(`${errors.longitude.message}`)}
                            </p>
                        )}
                        <div>
                            <span>Longitude:</span>
                            <input {...register("longitude")}  value={longitude} disabled={true} onChange={(e:any) => setLongitude(e.type.value)}/>
                        </div>

                    </label>


                </div>
                <MapView longitude={longitude} latitude={latitude} currentLocation={currentLocation} setCurrentLocation={setCurrentLocation} setCoordinate={setCoordinate}/>
            </div>
            <div id={"first_form_id"} className={"overflow-hidden w-full "+ (current_content === 1? "animate-h-in":"animate-h-out")}>
                <label>Parking details</label>
                <FirstForm register={register} errors={errors}/>
            </div>
            <div id={"second_form_id"} className={"overflow-hidden w-full "+ (current_content === 2? "animate-h-in":"animate-h-out")}>
                <label>Garage working info</label>
                <SecondForm setValue={setValue} register={register} errors={errors}/>
            </div>

        </form>
        <div className={"rounded-3xl flex flex-col gap-8 p-5 bg-[#FFC7CD]/50 justify-center items-center"}>
            <button
                onClick={() => {setCurrent_content(i => i===0?0 : i-1)}}
                className="material-symbols-outlined bg-white rounded p-4 font-bold text-6xl text-primary disabled:bg-gray-100 disabled:text-gray-200" disabled={(current_content === 0)}>arrow_upward
            </button>
            <button onClick={() => {setCurrent_content(i => i===2?2 : i+1)}}
                className={"material-symbols-outlined bg-white rounded p-4 font-bold text-6xl text-primary disabled:bg-gray-100 disabled:text-gray-200"} disabled={(current_content === 2)}>arrow_downward</button>
        </div>
    </div>
    </>

}

export default AddGarageActivity