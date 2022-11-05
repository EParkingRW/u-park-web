import Head from 'next/head'
import React from "react";
import GoogleMapReact, {Coords} from "google-map-react";

export default function Home() {
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
const defaultProps = {
        center: {lat:59.938043, lng:30.337157},
        zoom: 9,
        greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
    };

console.log(process.env.GOOGLE_MAP_KEY)


    return (
    <div className={""}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="e parking website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main  className={"w-screen h-screen"}>
          <div>hello there</div>
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
      </main>
    </div>
  )
}
