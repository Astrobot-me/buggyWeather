import { secret } from "./conf";
import { useSelector } from "react-redux";
import { useState } from "react";

export default async function GetForecast(latitude, longitude, count = 15,unit="metric") {
                    

    const uri = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${secret.OWAPI_SECRET}&units=${unit}&cnt=${count}`

    console.warn("API DATA CALL MADE /FORECAST");

   try {
        const reponse = await fetch(uri)
        if(reponse.ok) return await reponse.json()
   } catch (error) {
        return null
   }
    

}