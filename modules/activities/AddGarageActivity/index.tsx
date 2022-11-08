import React, {useState} from "react";
import GoogleMapReact, {Coords} from "google-map-react";
import UploadImage from "../../../components/UploadImage";

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
const SecondForm = () => {
    const [files, setFiles] = useState([])
    const hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
    return (
        <div className={"w-full h-full flex flex-col justify-center px-2 md:px-10 xl:px-96"}>
            <label className={"flex flex-col"}>
            <span>
                Image
            </span>
                <UploadImage updateFilesCb={setFiles} multiple={false}/>
            </label>
            <label className={"flex flex-col"}>
            <span>
                Hour fees
            </span>
                <input type={"number"} className={"p-4 rounded-xl w-full bg-[#DEE7FF]"} placeholder={"600"}/>
            </label>
            <div className={"flex justify-between gap-5"}>
                <label className={"flex flex-col w-full"}>
                    <span>
                        Start time
                    </span>
                    <select className={"p-4 rounded-xl w-full bg-[#DEE7FF]"}>
                        {hours.map(hour => <option key={"hour_"+hour} value={hour} className={""}>{hour}</option>)}
                    </select>
                </label>
                <label className={"flex flex-col w-full"}>
                    <span>
                        End time
                    </span>
                    <select className={"p-4 rounded-xl w-full bg-[#DEE7FF]"}>
                        {hours.map(hour => <option key={"hour_"+hour} value={hour} className={""}>{hour}</option>)}
                    </select>
                </label>

            </div>
            <label className={"flex flex-col"}>
            <span>
                Slots
            </span>
                <input type={"number"} className={"p-4 rounded-xl w-full bg-[#DEE7FF]"} placeholder={"300"}/>
            </label>
            <button type={"submit"} className={"px-12 bg-primary py-2 mt-2 md:mt-20 text-white rounded-2xl self-center"}>Save</button>

    </div>
    )
}
const FirstForm = () => {
    return <div className={"w-full h-full flex flex-col justify-center px-2 md:px-10 xl:px-96"}>
        <label className={"flex flex-col"}>
            <span>
                Name
            </span>
            <input type={"text"} className={"p-4 rounded-xl w-full bg-[#DEE7FF]"} placeholder={"ABC parking slot"}/>
        </label>
        <label className={"flex flex-col"}>
            <span>
                Address
            </span>
            <input type={"text"} className={"p-4 rounded-xl w-full bg-[#DEE7FF]"} placeholder={"KV 121 c, kiyovu"}/>
        </label>
        <label className={"flex flex-col"}>
            <span>
                Description
            </span>
            <textarea rows={5} className={"p-4 rounded-xl w-full bg-[#DEE7FF]"} placeholder={"KV 121 c, kiyovu"}/>
        </label>


    </div>
}

const AddGarageActivity = () => {
    const [current_content, setCurrent_content] = useState(0)
    const [latitude, setLatitude] = useState<undefined|number>(undefined)
    const [longitude, setLongitude] = useState<undefined|number>(undefined)
    const [currentLocation, setCurrentLocation] = useState({ lat: -1.9580392673301357, lng: 30.069174678417752 })

    const setCoordinate = (lat:number, long:number) => {
        setLatitude(lat)
        setLongitude(long)
    }
    return <>
    <div className={"flex flex-col md:flex-row md:gap-10 gap-2 h-full items-center"}>
        <form id={"forms"} className={" w-full h-[90%] min-h-[500px]"}>
            <div id={"mad_choosing_id"} className={"overflow-hidden w-full "+ (current_content === 0? "animate-h-in":"animate-h-out")}>

                <div className={"flex justify-between"}>
                    <label>Garage location</label>
                    <label>
                        <span>Latitude:</span>
                        <input value={latitude} onChange={(e:any) => setLatitude(e.type.value)}/>
                    </label>
                    <label>
                        <span>Longitude:</span>
                        <input value={longitude} onChange={(e:any) => setLongitude(e.type.value)}/>
                    </label>


                </div>
                <MapView longitude={longitude} latitude={latitude} currentLocation={currentLocation} setCurrentLocation={setCurrentLocation} setCoordinate={setCoordinate}/>
            </div>
            <div id={"first_form_id"} className={"overflow-hidden w-full "+ (current_content === 1? "animate-h-in":"animate-h-out")}>
                <label>Garage details</label>
                <FirstForm/>
            </div>
            <div id={"second_form_id"} className={"overflow-hidden w-full "+ (current_content === 2? "animate-h-in":"animate-h-out")}>
                <label>Garage working info</label>
                <SecondForm/>
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