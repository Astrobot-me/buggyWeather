import React from "react";

export default function CardFrame({title= "All previous Searches",width = "w-[90%]",children,overfloy_y=false,col=false}){
    return(
        <>
            <div className={`card-normal ${width}  rounded-lg bg-gray-900 shadow-lg`}>
                <div className={`card-body w-[100%] ${overfloy_y?" overflow-y-auto":"overflow-auto"} `}>
                    <h1 className="card-title">{title}</h1>
                    <div className={`flex ${col?"flex-col":"flex-row"} items-center gap-4 ${overfloy_y?" overflow-y-auto":"overflow-auto"}`}>
                        
                        {children}
                      
                    </div>
                    
                </div>
            </div>
        </>
    )
}