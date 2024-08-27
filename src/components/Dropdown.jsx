import React from "react";
import { Link } from "react-router-dom";

export default function Dropdown({data = []}) {

    // console.log("MApper Data",data);
    

    return (
        <>
            <div className="flex flex-col absolute w-full h-[180px]  my-1 gap-1 overflow-auto ">
                { data !== null && (
                    data.data.map((item)=>{
                        // console.log("Key: ",item?.Key);
                        
                        return <Link to={`/getweather/?place=${item.name}&lat=${item.latitude}&long=${item.longitude}`} key={item?.latitude}><label key={item?.latitude} htmlFor="" className="bg-slate-950 w-full label rounded hover:bg-[#141723] px-5 cursor-pointer "
                        onClick={()=>{
                            // console.log("Clicked: ",item?.latitude);
                            
                        }}
                        > 📍 {item?.name} ◦ {`${item?.county} ${item?.region}`} <span className="italic"> {`${item?.region_code} ${item?.country}`}</span> </label></Link>
                    })
                )
                }


            </div>
        </>
    )
}