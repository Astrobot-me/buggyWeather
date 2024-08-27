import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import authService from '../services/auth';
import { ThreeCircles } from 'react-loader-spinner';

const Navbar = () => {

  const authStatus = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.userData)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [isClicked, setClicked] = useState(false)

  const handleLogout = () => {
    setClicked(true)
    authService.deleteAllSessions().then(() => {
      dispatch(logout());
      navigate("/login")
    }).catch((e) => {
      setClicked(false)
      alert(`Error Occured ${e.message}`)
    })
  }



  return (
    <div className="navbar bg-base-300 text-base-content justify-between">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" transform="rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.384"></g><g id="SVGRepo_iconCarrier"> <path d="M9.5 15H9.51M15.5 15H15.51M9.5 19H9.51M12.5 17H12.51M12.5 21H12.51M15.5 19H15.51M6 16.4438C4.22194 15.5683 3 13.7502 3 11.6493C3 9.20008 4.8 6.9375 7.5 6.5C8.34694 4.48637 10.3514 3 12.6893 3C15.684 3 18.1317 5.32251 18.3 8.25C19.8893 8.94488 21 10.6503 21 12.4969C21 14.0582 20.206 15.4339 19 16.2417" stroke="#ffffff" strokeWidth="1.464" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </button>
      </div>

      <div className='flex flex-row gap-5'>
        {authStatus && (
          <ul className='flex gap-5'>
            <Link to="/getweather"> <li>Weather</li> </Link>
            <Link to="/"> <li>Home</li> </Link>
            <Link to={`/user/${userData.$id}`}> <li>Profile</li> </Link>
          </ul>
        )

        }

        {authStatus ? (
          <button className="btn btn-primary" onClick={handleLogout}>
            {isClicked ? (
              <p className="flex items-center justify-center">
                <ThreeCircles
                  visible={true}
                  height="30"
                  width="30"
                  color="#ffffff"
                  ariaLabel="three-circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </p>
            ) : (
              <>Logout, {(userData.name).split(" ")[0]}</>
            )}
          </button>
        ) : (
          <Link to="/login">
            <button className="btn btn-primary">Login</button>
          </Link>
        )}

      </div>

    </div>
  );
}

export default Navbar;
