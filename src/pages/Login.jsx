import React, { useState } from "react";
import authService from "../services/auth";
import authSlice from "../store/authSlice";
import { useDispatch } from "react-redux";
import { login as LoginAuth } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import dataServices from "../services/dataOps";
import { ThreeDots } from "react-loader-spinner";
import { Query } from "appwrite";

const Login = () => {

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isClicked, setClicked] = useState(false)

  const requestLogin = async (e) => {
    e.preventDefault()

    try {
      const deletePrevSessions = await authService.deleteAllSessions();
    } catch (error) {
      //alert(`Prev Session Exists ${error.message}`)
    }
    setClicked(true)
    try {
      const user = await authService.login({ email, password })
      // console.log("User", user);

      if (user != null) {
        const session = await authService.getCurrentUser();
        // console.log("Session", session);
        if (session) {
          let document;
          try {
            document = await dataServices.getUserconfig([Query.equal("userAuthId", [session.$id])])
            // console.log("doc",document);

          } catch (error) {
            alert(error.message)
          }

          if (document) {
            dispatch(LoginAuth({
              userData: session,
              userConfig: document.documents[0]
            }))
          }
          navigate("/")
        }


      }
    } catch (e) {
      setClicked(false)
      alert(`error occured : ${e.message}`)
    }


  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-sm mx-auto">
        <div className="card shadow-2xl bg-base-100">
          <div className="card-body">
            <h2 className="text-center text-2xl font-bold">Login</h2>
            <form className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" value={email} placeholder="email" className="input input-bordered w-full"
                  onChange={(e) => { setEmail(e.target.value) }}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered w-full" value={password}
                  onChange={(e) => { setPassword(e.target.value) }}
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password functionality soon</a>
                </label>
              </div>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">Remember me</span>
                  <input type="checkbox" className="checkbox checkbox-primary" />
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={(e) => { requestLogin(e) }}>
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

                      : "Login"

                  }

                </button>
              </div>
            </form>
            <div className="divider">OR</div>
            <div className="flex justify-center">
              <a href="/signup" className='btn btn-outline w-full'>Signup</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
