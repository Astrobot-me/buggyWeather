import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './services/auth'
import dataServices from './services/dataOps'
import { login, logout } from "./store/authSlice"
import { Outlet } from 'react-router-dom'
import { InfinitySpin } from 'react-loader-spinner';
import { Query } from 'appwrite'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {

        if (userData) {
          
          dispatch(login({
            userData: userData
          }))
          return userData;
        } else {
          dispatch(logout())  
          throw new Error("User not logged in");
        }
      })
      .then( async (userData) => {
        let document;
        try {
          document = await dataServices.getUserconfig([Query.equal("userAuthId", [userData.$id])])
          // console.log("doc",document);
          
        } catch (error) {
          alert(error.message)
        }
        
        if(document){
          dispatch(login({
            userData:userData,
            userConfig:document.documents[0]
          }))
        }
      })
      .catch((e) => { })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <>
      <Outlet />
    </>
  ) : <p className="w-full h-screen flex items-center justify-center"><InfinitySpin
    visible={true}
    width="200"
    color="#ffffff"
    ariaLabel="infinity-spin-loading"
  /></p>
}

export default App