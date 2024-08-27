import React, { useEffect, useState } from "react";
import Weathercard from "./Weathercard";
import CardFrame from "./CardFrame";
import dataServices from "../services/dataOps";
import { useSelector } from "react-redux";
import NotFound from "./NotFound";

export default function PreviousWeather(){
    const [history,setHistory] = useState(null)
    const userData = useSelector((state)=>state.auth.userData)

    useEffect(()=>{
        dataServices.getAllSearchHistory(userData?.$id)
        .then((result)=>{ 
          if(result && result.total > 0){
                setHistory(result.documents)
          
            }
        }).catch((e)=>{
            console.log(e.message);
            
        })
    },[])

    
    return (
        <>
            <CardFrame title="All Previous Searches are here">
                {
                    history !== null ? (
                        history.map((item)=>{
                            const data = JSON.parse(item.resultSet)                         
                            return <Weathercard key={item.place} place={item.place} updatedAt={item.$updatedAt} data={data}/>
                        })
                    ) : <NotFound text="If nothing is visible here, Trying Searching for few places then Visit"/>
                }
            </CardFrame>
        </>
    )
}