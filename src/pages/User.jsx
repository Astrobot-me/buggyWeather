import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authService from "../services/auth";
import { Navbar, Footer } from "../components";
import { InfinitySpin } from "react-loader-spinner";
import CardFrame from "../components/CardFrame";
import { useDispatch, useSelector } from "react-redux";
import dataServices from "../services/dataOps";
import { Query } from "appwrite";
import { login } from "../store/authSlice";
import { secret } from "../services/conf";

export default function User() {
    const [user, setUser] = useState(null)
    const { id } = useParams();
    const [verify, setVerify] = useState("Click Here to Verify Email")
    const [disable,setDisable] = useState(false)
    const [count,setCount] = useState(useSelector((state)=>state.auth.userConfig?.defaultCnt))
    const [metric,setMetric] = useState(useSelector((state)=>state.auth.userConfig?.defaultMetric))

    const userConfig = useSelector((state)=>state.auth.userConfig)
    const userData = useSelector((state)=>state.auth.userData)

    const dispatch = useDispatch()
    useEffect(() => {
        if (id) {
            authService.getCurrentUser().then((userData) => {
                if (userData) {
                    setUser(userData)
                }
            }).catch((e) => {
                alert("No user Found")
            })
        }
    }, [id])

    const handleVerification = () => {
        authService.verifyAccount(secret.REDIRECT_URL).then(() => {
            setVerify("Email Sent")
        }).catch((e) => {
            alert(e.message)
        })
    }

    const setConfig = useCallback( async () => {

        if(count == userConfig.defaultCnt && metric == userConfig.defaultMetric) return;

        setDisable(true) //button disbabled
        const document = await dataServices.getUserconfig([Query.equal("userAuthId",[userData?.$id])])
        
        if(document && document.total > 0) {
            try {
                const newState = await dataServices.updateRecord({
                    docid:document?.documents[0].$id,
                    defaultCnt:Number(count),
                    defaultMetric:metric
                    
                })
                dispatch(login({
                    userData:userData,
                    userConfig:newState
                }))
                alert("User Choices Updated Accordingly ")
            } catch (error) {
                console.log(error);
                
            }
        }else{

            dataServices.createRecord({
                userAuthId:userData?.$id,
                defaultPlace:userConfig?.defaultPlace,
                defaultLat:userConfig?.defaultLat,
                defaultLong:userConfig?.defaultLong,
                defaultCnt:count,
                defaultMetric:metric
            }).then((newState)=>{
                dispatch(login({
                    userData:userData,
                    userConfig:newState
                }))
                alert(`${place} is now set to Homecity`)
            }).catch((e)=>{
                console.log(e);
                
            })
        }

        
    },[count,metric])

    if (!user) return <p className="w-full h-screen flex items-center justify-center"><InfinitySpin
        visible={true}
        width="200"
        color="#ffffff"
        ariaLabel="infinity-spin-loading"
    /></p>

    let content = (
        <>
            <Navbar />
            <div className="w-full h-screen flex sm:flex-row flex-col items-start justify-center gap-2 p-3">
                <div className="sm:w-[26%] w-full  h-[400px] flex flex-col items-center justify-center bg-slate-700 gap-2 p-3 py-1 rounded-md">
                    <img src={`https://via.placeholder.com/150x150.png?text=No pfp`} alt="avatar_url" className="w-28 rounded-full" />
                    <p className="text-xl text-blue-600 font-semibold">{user.name || null}</p>
                    <p className="">{user.email || null}</p>
                    <p className="text-sm text-gray-600 italic">{id}</p>
                    <p className="">{user.emailVerification || null}</p>
                    {(user.emailVerification) ? <button className="btn btn-primary">Email Verified</button> : <button className="btn btn-warning" onClick={handleVerification}>{verify}</button>}
                </div>
                <CardFrame width="sm:w-[70%] w-full" title="User Config Settings ⚙">
                    <div className="w-[100%] flex flex-col gap-2">
                        <label class="form-control w-[100%] ">
                            <div class="label text-white">
                                <span class="label-text text-white">Home City</span>
                                <span class="label-text-alt text-white">Default</span>
                            </div>
                            <input type="text " value={userConfig.defaultPlace} class="input  w-[100%] bg-slate-800 " disabled={true} />
  
                        </label>

                        <label class="form-control w-[100%] ">
                            <div class="label">
                                <span class="label-text text-white">Select default Unit Imerial /metric</span>
                            </div>
                            <select class="select select-bordered bg-slate-800 " onChange={(e)=>setMetric(e.target.value)}>
                                <option disabled >Pick one</option>
                                <option selected={(userConfig.defaultMetric === "imperial")} value={`imperial`} >Imperial</option>
                                <option selected={(userConfig.defaultMetric === "metric")} value={`metric`} >metric</option>
                                
                            </select>
                        
                        </label>
                        <label class="form-control w-[100%] ">
                            <div class="label">
                                <span class="label-text text-white">Select Forecast Count</span>
                            </div>
                            <select class="select select-bordered bg-slate-800" onChange={(e)=>setCount(e.target.value)}>

                                <option disabled selected>Pick one</option>
                                <option selected={(userConfig.defaultCnt == 10)} value={`10`}>10</option>
                                <option selected={(userConfig.defaultCnt == 15)} value={`15`}>15</option>
                                <option selected={(userConfig.defaultCnt == 20)} value={`20`}>20</option>
                                <option selected={(userConfig.defaultCnt == 25)} value={`25`}>25</option>
                                
                            </select>
                        
                        </label>
                        <div className="flex w-[100%]">
                            <button className="btn btn-success" onClick={setConfig} disabled={disable}>Change Config</button>
                        </div>
                    </div>

                </CardFrame>
            </div>
            <Footer />
        </>
    )
    return content
} 