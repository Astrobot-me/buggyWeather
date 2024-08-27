import React, { useEffect, useState } from "react";
import { Navbar, Footer } from "../components";
import { useSelector } from "react-redux";
import Searchcard from "../components/Search";
import PreviousWeather from "../components/PreviousWeather";
import CardFrame from "../components/CardFrame";
import WeatherStats from "../components/WeatherStats";
import useGetWeather from "../services/useGetWeather";
import { TypeAnimation } from 'react-type-animation';

export default function Home() {
    const userData = useSelector((state) => state.auth.userData)
    const authStatus = useSelector((state) => state.auth.status)
    const [place, setPlace] = useState(useSelector((state) => state.auth.userConfig?.defaultPlace))
    // const [latitude,setLatitude] = useState(null)
    // const [longitude,setLongitude] = useState(null)

    const lat = useSelector((state) => state.auth?.userConfig?.defaultLat);
    const long = useSelector((state) => state.auth?.userConfig?.defaultLong);

    const weather = useGetWeather(lat, long, authStatus) || null;
    const options = {
        hour12: true,
        timeStyle: "short",
        dateStyle: "full"
    }
    // console.log("userSession:: ",userData);
    //26.904789 and 75.756797 : Jaipur
    //http://localhost:5173/getweather/?lat=26.904789&long=75.756797

    // useEffect(()=>{
    //     setLatitude(lat)
    //     setLongitude(long)
    // },[authStatus])

    return (
        <>
            <Navbar></Navbar>

            <div className="w-full h-auto flex flex-col items-center justify-start p-4">

                {authStatus ? <p className="label text-xl">Hello,  <span className="text-xl px-1">{userData.name} 👋</span> </p> : <p className="w-full h-screen flex flex-col items-center justify-start"> <TypeAnimation
                    sequence={[
                        'buggyWeather',
                        1000,
                        'Personalized weather app', //  Continuing previous Text
                        1000,
                        'Made on React',
                        1000,
                        'Made by Aditya (Astrobot)',
                        1000,
                    ]}
                    style={{ fontSize: '4em' ,fontWeight:'semibold',marginTop:'40px',textAlign:"center"}}
                    speed={1}
                    deletionSpeed={10}
                    repeat={Infinity}
                    cursor={true}
                />
                <p>Please Login to Experience</p>
                </p>}
                {authStatus && (

                    <div className="flex flex-col items-center justify-start gap-4 w-full">
                        <Searchcard></Searchcard>

                        {weather == null && (
                            <div role="alert" className="alert alert-info w-[90%]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="h-6 w-6 shrink-0 stroke-current">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>There is no default Homecity set now, Please try Searching and set default</span>
                            </div>
                        )}
                        {weather !== null && (
                            <CardFrame title={` Current Weather Stats for ${place} as of ${new Date(weather.dt * 1000).toLocaleString("en-IN", options)} [ HOMECITY ]`} width="w-[95%]" col={true}>
                                <WeatherStats data={weather} />
                            </CardFrame>
                        )

                        }

                        <PreviousWeather />
                    </div>
                )}
            </div>
            <Footer></Footer>
        </>
    )

}