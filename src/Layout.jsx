import React from "react";
import {Outlet} from 'react-router-dom';
import { Navbar,Footer } from "./components";

export const Layout = ()=>{

    return(
        <>
        <Navbar/>
        <Outlet/>
        <Footer/>
        </>
    )
}