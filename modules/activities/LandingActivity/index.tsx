import React from "react";
import GoogleMapReact from "google-map-react";
import {useData} from "../../context/DataContext";

let LandingPage = () => {
    const { garages } = useData();
    const GaragePin = ({name}:any) => (
        <div className="flex flex-col items-center justify-center">
            <span className="text-primary bg-white rounded-xl p-4 absolute top-0 -translate-y-14 w-[150px]">{name}</span>
            <span className="material-symbols-outlined text-3xl text-primary font-bold">local_parking</span>
        </div>
        )
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
    //-1.944612, 30.061126
    const defaultProps = {
        center: {lat:-1.944612, lng:30.061126},
        zoom: 9,
        greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
    };

    return <>
        <div  className={"w-screen h-screen"}>
            <GoogleMapReact
                bootstrapURLKeys={{ key:process.env.GOOGLE_MAP_KEY as string}}
                defaultZoom={defaultProps.zoom}
                yesIWantToUseGoogleMapApiInternals
                defaultCenter={defaultProps.center}
                onGoogleApiLoaded={({ map, maps }:any) => handleApiLoaded(map, maps)}
            >
                {
                    garages.map((each, index) => {
                        return (
                            <GaragePin key = {index + "key_garage"}
                                lat={each.latitude}
                                lng={each.longitude}
                                name={each.name}
                            />
                        )
                    })
                }
            </GoogleMapReact>
        </div>
    </>
}

export default LandingPage;