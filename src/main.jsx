import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom';
import Login from './pages/Login.jsx';
import SignUp from './pages/Signup.jsx';
import { Verify } from './pages/Verify.jsx';
import {Provider} from "react-redux";
import store from './store/store.js';
import AuthChecker from './components/authChecker.jsx';
import Home from "./pages/Home.jsx";
import Weather from './pages/Weather.jsx';
import User from './pages/User.jsx';
import GetWeather from './pages/GetWeather.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' >
      <Route path="/" element={
        <AuthChecker authentication>
          <Home></Home>
        </AuthChecker>
      }></Route>

      <Route path="/weather" element={
        <AuthChecker authentication>
          <Weather></Weather>
        </AuthChecker>
      }></Route>


      <Route path='/login' element={
        <AuthChecker authentication={false}>
          <Login></Login>
        </AuthChecker>
      }></Route>

      <Route path='/signup' element={
        <AuthChecker authentication={false}>
          <SignUp></SignUp>
        </AuthChecker>
      }></Route>

      <Route path='/verify' element={
        <AuthChecker authentication={false}>
          <Verify></Verify>
        </AuthChecker>
      }></Route>
      
    </Route>
  )
)

const router2 = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:(
          <AuthChecker authentication={false}>
            <Home/>
          </AuthChecker>
        )
      },
      {
        path:"/home",
        element:(
          <AuthChecker authentication={true}>
            <Home/>
          </AuthChecker>
        )
      },
      {
        path:"/weather",
        element:(
          <AuthChecker authentication={true}>
            {" "}
            <Weather/>
          </AuthChecker>
        )
      },
      {
        path:"/getweather",
        element:(
          <AuthChecker authentication={true}>
            {" "}
            <GetWeather/>
          </AuthChecker>
        )
      },
      {
        path:"/user/:id",
        element:(
          <AuthChecker authentication={true}>
            {" "}
            <User></User>
          </AuthChecker>
        )
      },
      {
        path:"/verify",
        element:(
          
            <Verify/>
         
        )
      },
      {
        path:"/signup",
        element:(
          <AuthChecker authentication={false}>
            <SignUp/>
          </AuthChecker>
        )
      },
      {
        path:"/login",
        element:(
          <AuthChecker authentication={false}>
            <Login/>
          </AuthChecker>
        )
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
      <RouterProvider router={router2}></RouterProvider>

    </Provider>
  
)
