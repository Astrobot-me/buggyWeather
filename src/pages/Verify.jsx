import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth";
import { useSelector } from "react-redux";


export const Verify = () => {

    

    const [message,setMessage] = useState({
        status:null,
        mess:null
    })
    
    const navigate = useNavigate()
    let verificationStatus = null;
    const store  = useSelector((state) => state.auth)
    // console.log(`Store ${store}`);
    
    if(store.status) {
        
        verificationStatus = store.userData?.emailVerification
    }else{
        navigate("/")
    }

    useEffect(()=>{
        const param = new URLSearchParams(window.location.search)
        const secret = param.get("secret")
        const id = param.get("userId")
        if(!verificationStatus && verificationStatus !== null){
            // console.log("triggerd");
            
            authService.updateVerification(id,secret).then((res)=>{
            setMessage({
                status:200,
                mess:"Account Successfully Verified"
            })
        }).catch((e)=>{
            setMessage({
                status:400,
                mess:"Account Verification Failed ! Try Again"
            })
        })}else{
            navigate("/")
        }
    },[])
   
    return (
        <>
            <div className="w-full h-screen flex items-center justify-center text-lime-400 text-[30px]">
                { (message.status === 400 || message.status === 200) && (
                   <div className="text-center h-screen">{message.mess }</div>
                )
                }
                
                
            </div>
        </>
    )
}