import React from 'react';
import Cloud from "../components/assets/cloud.png";
import { useState } from 'react';
import authService from '../services/auth';
import { useDispatch } from 'react-redux';
import { login as LoginAuth } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import dataServices from '../services/dataOps';
import { Query } from 'appwrite';
import { ThreeDots } from 'react-loader-spinner';

const SignUp = () => {

  const [name,setName] = useState(null)
  const [email,setEmail] = useState(null)
  const [password,setPass] = useState(null)
  const [isClicked, setClicked] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitUser = async (e)=>{
    e.preventDefault()
    setClicked(true)
    try {
      const user = await authService.createAccount(email,password,name);

      if(user) {
        const session = await authService.getCurrentUser();

        if(session){

          const newUser = await dataServices.createRecord({
            userAuthId:session.$id,
            defaultPlace:"null",
            defaultLat:"null",
            defaultLong:"null"
          })

          // const document = await dataServices.getUserconfig([Query.equal("userAuthId",[session.$id])])

          dispatch(LoginAuth({
            userData:session,
            userConfig:newUser
          }))
          navigate("/")
        }
      }



    } catch (error) {
      setClicked(false)
      alert(`Error Occured ${error.message}`)
    }
  }

  const initiateVerification = () =>{
      // createVerification()
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">

      <div className="card shadow-2xl bg-base-100 flex lg:flex-row flex-col">
        <div className="lg:w-1/2 flex-none rounded-tl-sm ">
          <img src={Cloud} alt="Weather" className="object-cover bg-center w-full h-full" width="600px" height="600px" style={{width:"600px",height:"600px"}}/>
        </div>
        <div className="lg:w-1/2 flex-1 p-6">
          <h2 className="text-center text-2xl font-bold">Sign Up</h2>
          <form className="space-y-4" onSubmit={(e)=>{
            e.preventDefault()
          }}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" placeholder="Name" className="input input-bordered w-full" value={name}  onChange={(e)=>{setName(e.target.value)}} required/>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="Email" className="input input-bordered w-full" value={email}  onChange={(e)=>{setEmail(e.target.value)}} required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="Password" className="input input-bordered w-full" value={password}  onChange={(e)=>{setPass(e.target.value)}} required />
            </div>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Remember me</span> 
                <input type="checkbox" className="checkbox checkbox-primary" />
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary w-full" onClick={(e)=>{submitUser(e)}}>
              {
                    (isClicked) ?
                      <ThreeDots
                        visible={true}
                        height="50"
                        width="50"
                        color="#ffffff"
                        radius="3"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />

                      : "Sign Up"

                  }

              </button>
            </div>
          </form>
          <div className="divider">OR</div>
          <div className="flex justify-center">
          <a href="/login" className='btn btn-outline w-full'>Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
