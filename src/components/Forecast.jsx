import React from "react";
import NotFound from "./NotFound";

export default function Forecast({data=null,index = 0}){
    const options = {
        hour12: true,
        timeStyle: "short",
        dateStyle: "full"
    }

    if(data === null) return <NotFound></NotFound>

    return(
        <>
            <div className="w-[94%] h-auto bg-slate-950 rounded-md shadow-md hover:scale-105 transition transform duration-300 p-2   flex flex-col">
                <label htmlFor="" className="pl-3 pt-3 font-semibold text-xl">{`${index}. `} {new Date(data.dt * 1000).toLocaleString("en-IN", options)} </label>
                <div className="w-[100%] flex justify-between">
                    <div className="w-[70%] flex sm:flex-row flex-wrap flex-col pl-2 gap-2 mt-4">
                        <div className="px-2">
                            <label htmlFor="" className="text-md font-medium ital">Weather</label>
                            <p className="text-sm italic">{data.weather[0].main}</p>
                        </div>
                        <div className="px-2">
                            <label htmlFor="" className="text-md font-medium ital">Temperature</label>
                            <p className="text-sm italic">{data.main.temp} ◦c</p>
                        </div>
                        <div className="px-2">
                            <label htmlFor="" className="text-md font-medium ital">Humidity</label>
                            <p className="text-sm italic">{data.main.humidity} %</p>
                        </div>
                        <div className="px-2">
                            <label htmlFor="" className="text-md font-medium ital">Clouds</label>
                            <p className="text-sm italic">{data.clouds.all} %</p>
                        </div>
                        <div className="px-2">
                            <label htmlFor="" className="text-md font-medium ital">Visiblity</label>
                            <p className="text-sm italic">{data.visibility} m</p>
                        </div>
                        <div className="px-2">
                            <label htmlFor="" className="text-md font-medium ital">Forecast</label>
                            <p className="text-sm italic">{data.weather[0].description} </p>
                        </div>
                    </div>
                    <div className="w-[30%] h-[100%] flex justify-end ">
                        <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="weathericon" className="w-20 px-2"></img>
                    </div>
                </div>
            </div>
        </>
    )
} 