import React, { useEffect,useRef, useState } from "react";
import { usefindSearchQuery } from "../services/usefindSearchQuery";
import Dropdown from "./Dropdown";
import { useDebounceCallback } from 'usehooks-ts'


export default function Searchcard() {
    const [query, setQuery] = useState("")
    const [searchQuery,setSearchQuery] = useState("")
    const [isVisible,setVisible] = useState(false)
    const ref = useRef(null)

    let searchData = usefindSearchQuery(searchQuery.toLowerCase())
    // setData(searchData)

    // const handleSearchQuery = async () => {
    //     searchData = usefindSearchQuery(query.toLowerCase())
        
    // }

    const debounced = useDebounceCallback(setSearchQuery,500)

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
            <div className="card-normal w-[80%] rounded-lg bg-gray-900 text-white " ref={ref} onBlur={handleDisappear}>
                <div className="card-body w-[100%] text-white ">
                    <h1 className="card-title">Get Latest weather information</h1>
                    <span className="label-text text-white">Search Location</span>
                    <div className="relative" >
                        <input type="text" name="" id="" value={query} className=" bg-slate-800  input input-bordered w-full "
                            onChange={(e) => {
                                setQuery(e.target.value)
                                debounced(e.target.value)
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