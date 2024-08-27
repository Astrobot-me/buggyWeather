import React, { useEffect,useRef, useState } from "react";
import { usefindSearchQuery } from "../services/usefindSearchQuery";
import Dropdown from "./Dropdown";



export default function Searchcard() {
    const [query, setQuery] = useState("")
    const [data, setData] = useState([])
    const [isVisible,setVisible] = useState(false)
    const ref = useRef(null)

    let searchData = usefindSearchQuery(query.toLowerCase())
    // setData(searchData)

    const handleSearchQuery = async () => {
        searchData = usefindSearchQuery(query.toLowerCase())
        
    }

    const handleDisappear = (e) =>{
        // setData(null)
        // setTimeout(()=>{
        //     setVisible(false)
        // },100)
        if (ref.current && !ref.current.contains(e.relatedTarget)) {
            setVisible(false);
        }
        
    }
    
    return (
        <>
            <div className="card-normal w-[80%] rounded-lg bg-gray-900" ref={ref} onBlur={handleDisappear}>
                <div className="card-body w-[100%] ">
                    <h1 className="card-title">Get Latest weather information</h1>
                    <span className="label-text">Search Location</span>
                    <div className="relative" >
                        <input type="text" name="" id="" value={query} className="input input-bordered w-full "
                            onChange={(e) => {
                                setQuery(e.target.value)
                                setVisible(true)
                            }}
                            onClick={()=>{
                                setVisible(true)
                            }}
                        />
                        { (searchData !== null && isVisible) && (
                            <Dropdown data={searchData} />
                        )

                        }
                    </div>
                    <div className="card-actions justify-start">
                        <button className="btn btn-primary">Search 🔍</button>
                        <button className="btn btn-primary" onClick={(e)=>{
                            setQuery("")
                        }}>Clear 🧹</button>
                    </div>
                </div>

            </div>
        </>
    )
}