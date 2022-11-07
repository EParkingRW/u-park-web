import React, {useState} from "react";
import GoogleMapReact from "google-map-react";

const MapView = () => {
    const defaultProps = {
        center: {lat:59.938043, lng:30.337157},
        zoom: 9,
        greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
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
        // use map and maps objects
    };
    return <div className={"w-full h-full overflow-hidden rounded-3xl"}>
        <GoogleMapReact
            bootstrapURLKeys={{ key:process.env.GOOGLE_MAP_KEY as string}}
            defaultZoom={defaultProps.zoom}
            yesIWantToUseGoogleMapApiInternals
            defaultCenter={defaultProps.center}
            onGoogleApiLoaded={({ map, maps }:any) => handleApiLoaded(map, maps)}
        >
            <AnyReactComponent
                lat={59.955413}
                lng={30.337844}
                text="My Marker"
            />
        </GoogleMapReact>
    </div>
}
const SecondForm = () => {
    return (
        <div className={"w-full h-full bg-red-800 flex flex-col justify-center px-2 md:px-10 xl:px-96"}>


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
    return <>
    <div className={"flex md:gap-10 gap-2 h-full relative items-center relative"}>
        <form id={"forms"} className={"w-full h-[90%] min-h-[500px]"}>
            <div id={"mad_choosing_id"} className={"overflow-hidden w-full "+ (current_content === 0? "animate-h-in":"animate-h-out")}>
                <label>Garage location</label>
                <MapView/>
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
        <div className={"rounded-3xl flex flex-col gap-8 gap-2 p-5 bg-[#FFC7CD]/50 justify-center items-center"}>
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