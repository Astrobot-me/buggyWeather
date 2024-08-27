import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar,Footer } from "../components";

export default function Weather(){
    const dispatch = useDispatch()

    // const authStatus

    return(
        <>
        <Navbar></Navbar>
        <div className="w-full h-screen flex items-center justify-center">
            This is a Weather page
        </div>
        <Footer/>
        </>
    )
}