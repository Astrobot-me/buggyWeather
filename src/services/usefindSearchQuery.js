import { secret } from "./conf";
import { useState, useEffect } from "react";

export function usefindSearchQuery(query) {

    const [data, setData] = useState(null)

    const getAPIResponse = async () => {
        
        if (query !== "" && query.length >= 3) {
            console.warn("API CALL MADE");
            const uri = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${secret.ACCWEATHER_SECRET}&q=${query}`

            const stack_uri = `http://api.positionstack.com/v1/forward?access_key=${secret.POSITIONSTACK_SECRET}&query=${query}&limit=10&output=json`

           try {
             const data = await fetch(stack_uri)
             const jsonData = await data.json()
             // console.log("jsonData", jsonData);
 
             setData(jsonData)
           } catch (error) {
            console.log("PS",error);
            
           }
        }
    }

    useEffect(() => {
       try {
         getAPIResponse()
       } catch (error) {
        console.log(error);
        
       }
    }, [query])

    return data;
}