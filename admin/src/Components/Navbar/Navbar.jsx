import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link, Navigate, useNavigate } from "react-router-dom";
import Profile from "../../assets/Images/profile.jpg";
import Logo from "../../assets/Images/logo.png";
import "./Navbar.css";
// import Cookies from "universal-cookie";
import { AuthContext } from "../../../Context/AuthContext";
const NavComponent = (props) => {
  const nav = useNavigate();
  const {token, loading, setToken} = useContext(AuthContext)
  const logout = async() => {
    if(confirm('Apakah anda ingin mengakhiri sesi ini ?')){
      await fetch('http://localhost:4000/logout', {
        method: 'GET'
      }).then((response) => response.json()).then((result) => {
        console.log(result);
          if(result.success){
            setToken(null);
            localStorage.removeItem("token");
            nav('/login');
          }
      });
    }
  }

  return (
    <div className="navbar bg-slate-600">
      <div className="m-auto w-full px-5">
        <div className="flex-1">
          <NavLink to="/dashboard">
            <img src={Logo} alt="" className="w-44" onClick={() => {props.changePageTitle('Dashboard')}}/>
          </NavLink>
        </div>
        <div className="flex gap-x-3">
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="Tailwind CSS Navbar component" src={Profile} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-32 p-2 shadow"
              >
                <li className="bg-slate-300 hover:bg-slate-400 rounded-lg text-white">
                  <NavLink
                    to="/profile"
                    className={({isActive}) => (isActive ? 'bg-slate-400' : '')+' btn btn-sm no-animation bg-slate-300 hover:bg-slate-400 text-white'}
                  >
                    Logout
                  </NavLink>
                </li>
                {token ? 
                <li className="bg-red-300 hover:bg-red-400 rounded-lg text-white">
                  <button
                    onClick={() => logout()}
                    className='btn btn-sm no-animation bg-red-300 hover:bg-red-400 text-white'
                  >
                    Logout
                  </button>
                </li>
                : 
                <></>}
               
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavComponent;
