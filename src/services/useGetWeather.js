import React, { useEffect, useState } from "react";
import { secret } from "./conf";
import { useSelector } from "react-redux";

export default function useGetWeather(latitude, longitude, auth = true) {

    const [data, setData] = useState(null)
    const [unit, setUnit] = useState("metric")
    const userConfig = useSelector((state)=>state.auth.userConfig)
    
    // I was using accuweather at first only to find it sucks .. If you are reading this .. damn dude respect ++ 
    // const uri = `http://dataservice.accuweather.com/currentconditions/v1/${Key}?apikey=${secret.ACCWEATHER_SECRET}`
    
    useEffect(() => {

        if(unit !== userConfig?.defaultMetric){
            setUnit(userConfig?.defaultMetric)
        }

        const uri = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=75.756797&appid=${secret.OWAPI_SECRET}&units=${unit}`

        if (latitude !== "null" && longitude !== "null" && auth && latitude && longitude) {
            console.warn("API DATA CALL MADE");
            fetch(uri).then((res) => {
                return res.json()
            }).then((json) => {
                setData(json)
            }).catch((e) => {
                console.log(e);

            })
        }
    }, [latitude, longitude])

    return data;
}