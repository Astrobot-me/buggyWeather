import React, { useEffect, useState } from "react";
import sunrise from "../assets/sunrise.svg"
import sunset from "../assets/sunset.svg"
import place_svg from "../assets/place.svg"
import NotFound from "./NotFound";
import { useSelector } from "react-redux";

export default function WeatherStats({place,buttons=false,disable = false,animate=false,data=[],getforcast,setDefault }) {

    const [btnText,setbtnText] = useState("Set Default")
    const userConfig = useSelector((state)=>state.auth.userConfig)
    //Dateobject configs 
    const options = {
        hour12: true,
        timeStyle: "short",
        dateStyle: "full"
    }
    if(data===null) return <NotFound text="if you are seeing this, it means you didn't set any default Homecity or some error may have occured, Please try searching few cities"/>

    // useEffect(()=>{
    //     if(userConfig?.defaultPlace.toLowerCase() === place.toLowerCase()){
    //         setbtnText("Default")
    //     }
    // },[])

    return (
        <>
            <div className='flex flex-col p-3 w-[100%] ease-in gap-3 text-white'>
                <div className='flex w-[100%] justify-between'>
                    <div className='flex gap-10'>
                        <div className='flex flex-row gap-2'>
                            <img src={place_svg} className='w-12 h-14' alt="place" draggable={false} />
                            <div className='flex flex-col'>
                                <label htmlFor="" className='text-lg'>Place</label>
                                <p className='text-xl'>{`${place || userConfig?.defaultPlace  } ${data.sys.country}`}</p>
                            </div>
                        </div>
                        <div className=''>
                            <label htmlFor="" className='text-lg italic'>Temperature</label>
                            <p className='text-3xl'>{data.main.temp} ◦c</p>
                        </div>
                        <div className=''>
                            <label htmlFor="" className='text-lg italic'>Feels Like</label>
                            <p className='text-3xl'>{data.main.feels_like} ◦c</p>
                        </div>
                        <div className=''>
                            <label htmlFor="" className='text-lg italic'>Min</label>
                            <p className='text-3xl'>{data.main.temp_min } ◦c</p>
                        </div>
                        <div className=''>
                            <label htmlFor="" className='text-lg italic'>Max</label>
                            <p className='text-3xl'>{data.main.temp_max } ◦c</p>
                        </div>
                    </div>
                    <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weathericon" className='w-24' srcSet="" />
                </div>
                <div className='flex w-[100%] justify-start'>
                    <div className='flex gap-10'>
                        <div className=''>
                            <label htmlFor="" className='text-lg italic'>Weather Pattern</label>
                            <p className='text-3xl'>{data.weather[0].main} </p>
                        </div>  
                        <div className=''>
                            <label htmlFor="" className='text-lg italic'>Pressure</label>
                            <p className='text-3xl'>{data.main.pressure} bar</p>
                        </div>
                        <div className=''>
                            <label htmlFor="" className='text-lg italic'>Humidity</label>
                            <p className='text-3xl'>{data.main.humidity} %</p>
                        </div>
                        <div className=''>
                            <label htmlFor="" className='text-lg italic'>Visiblity</label>
                            <p className='text-3xl'>{data.visibility} m</p>
                        </div>
                        <div className=''>
                            <label htmlFor="" className='text-lg italic'>Wind</label>
                            <p className='text-3xl'>{data.wind.speed} m/s </p>
                        </div>
                        <div className=''>
                            <label htmlFor="" className='text-lg italic'>clouds</label>
                            <p className='text-3xl'>{data.clouds.all} %</p>
                        </div>
                    </div>

                </div>
                <div className='flex w-[100%] justify-start gap-7 mt-5'>
                    <div className='flex flex-row items-center gap-2'>
                        <img src={sunrise} className='w-12' alt="sunrise" draggable={false} />
                        <div className='flex flex-col'>
                            <label htmlFor="">Sunrise at</label>
                            <p className='text-xl'>{`${new Date(data.sys.sunrise * 1000).toLocaleString("en-IN", { timeStyle: "short" })}`}</p>
                        </div>
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                        <img src={sunset} className='w-12' alt="sunrise" draggable={false} />
                        <div className='flex flex-col'>
                            <label htmlFor="">Sunset at</label>
                            <p className='text-xl'>{`${new Date(data.sys.sunset * 1000).toLocaleString("en-IN", { timeStyle: "short" })}`}</p>
                        </div>
                    </div>

                </div>
            </div>
            { buttons && (
                <div className='flex items-center justify-center gap-3 '>
                    <button className='btn btn-warning' onClick={()=>{getforcast()}} >Get Weather forecast</button>
                    <button className='btn btn-primary ' disabled={disable} value={btnText} onClick={()=>{setDefault()}}>Set Default</button>
                </div>
            )

            }
        </>
    )
}