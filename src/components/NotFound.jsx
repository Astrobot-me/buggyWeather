import React from "react";

export default function NotFound({text=" its Taking a while 😦"}){
    return (
        <>  
            
            <div className="w-[100%] h-[100%] flex text-center">
                <p className="sm:text-4xl text-3xl font-light p-5 ">{text}</p>
            </div>
            
        </>
    )
}