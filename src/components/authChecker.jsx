import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {InfinitySpin} from 'react-loader-spinner';

export default function AuthChecker({children, authentication}){

    const authStatus = useSelector((state)=> state.auth.status)//false
    const [loader,setLoader] = useState(true)

    const navigate =  useNavigate();

    useEffect(()=>{
        // console.log("Auth Stutus: ",authStatus);
        
        if (authentication && authStatus !== authentication) {
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)

    },[authStatus,navigate,authentication])

    return(
        loader? <p className="w-full h-screen flex items-center justify-center"><InfinitySpin
        visible={true}
        width="200"
        color="#ffffff"
        ariaLabel="infinity-spin-loading"
        /></p> : <> {children} </> 
    )
} 

// export default authChecker;export default