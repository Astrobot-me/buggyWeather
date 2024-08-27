import React from "react";
import { Link } from "react-router-dom";

export default function Weathercard({data=[],place,updatedAt}) {
    const options = {
        hour12: true,
        timeStyle: "short",
        dateStyle: "short"
    }


    return (
        <>
            <Link to={`/getweather?lat=${data?.coord.lat}&long=${data?.coord.lon}&place=${place}`}>
                <div className="card-normal w-[300px] min-w-[300px] h-[400px] rounded-lg bg-indigo-600">
                <div className="card-body text-white">
                    <h1 className="font-semibold text-xl">📍 {place}</h1>
                    
                    <div className="relative mt-5 flex flex-col h-[80px]">
                        <p className="absolute text-[70px] right-2 top-0">{`${data?.main.temp}`} <span className="text-xl">◦C</span></p>
                        <p className="absolute text-[20px] bottom-1 right-0 mt-1">{data?.weather[0].main}</p>

                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="font-normal">Feels Like  <span className="italic text-xl font-medium  text-white">{data?.main.feels_like}</span></p>
                        <p className="font-normal ">Humidity  <span className="italic text-xl font-medium text-white">{data?.main.humidity} %</span></p>
                        <p className="font-normal">Pressure <span className="italic text-xl font-medium text-white">{data?.main.pressure} bar</span></p>
                        <p className="font-normal">Wind Speed <span className="italic text-xl font-medium text-white">{data?.wind.speed} m/s</span></p>
                        <p className="font-normal">Clouds <span className="italic text-xl font-medium text-white">{data?.clouds.all} %</span></p>
                    </div>
                    <p className="italic text-center mt-1">{`Updated at ${new Date(updatedAt).toLocaleString("en-IN",options)}`}</p>
                </div>
                </div>
            </Link>
        </>
    )
}


/*
~~Fix API call on home without auth ✅~~
Fix Home page Default weather ✅
> if not defualt prompt to default ✅
> same on get weather 
Fix Units & Counts on api Calls 
Looks why not updating the stats as well
*/