import React, { useEffect, useState } from "react";
import Logo from "../../assets/Images/logo.png";
import {passwordStrength} from 'check-password-strength';
import { Navigate, useNavigate } from "react-router-dom";

function Register() {
  const [isHide, setHide] = useState(true);
  const [users, setUser] = useState([]);
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
    passwordVerified: false
  });

  const navTo = useNavigate();

  const handleInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const processRegister = async() => {
    if(userData.email || userData.username || userData.password){
        if(userData.passwordVerified){
            await fetch('http://localhost:4000/user', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            }).then((res) => res.json()).then((msg) => {
                if(msg.success){
                    alert('Proses register berhasil. Anda akan dialihkan ke halaman login');
                    navTo('/login')
                }else{
                    if(msg.message.code == 11000){
                        if(msg.message.keyValue.email){
                            alert('Email telah digunakan');
                        }else{
                            alert('Username telah digunakan');
                        }
                    }
                }
            });
        }else{
            alert('Password anda terlalu lemah, silakan perbaiki');
        }
    }else{
        alert('Mohon Lengkapi data yang diperlukan');
    }
  };


  const [passwordStrengthValue, setPasswordStrength] = useState('');

  const checkPasswordStrength = (e) => {
    let passwordValue = e.target.value;
    let validate = passwordStrength(passwordValue);
    setPasswordStrength(validate);
    if(validate.id >= 1){
        setUserData({...userData, [e.target.name]: e.target.value, passwordVerified: true});
    }else{
        setUserData({...userData, passwordVerified: false});
    }
  }

  return (
    <div className="h-[65vh] grid grid-cols-1 ">
      {/* {users} */}
      <div className="m-auto flex shadow-2xl w-11/12">
        <div className="py-10 bg-slate-500 w-3/5 rounded-s place-content-center">
          <img src={Logo} alt="application logo" className=" m-auto w-3/4" />
        </div>
        <div className="w-full bg-slate-100 rounded-e p-4">
          <div className="text-center relative border-b-2 pb-2">
            <h4 className="font-semibold text-3xl mb-[-5px]">Halaman Registrasi</h4>
            <small className="text-sm">Silakan lengkapi data Anda</small>
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-3 mt-4">
            <div>
              <label className="input input-bordered flex items-center font-semibold">
                Email
                <input
                  type="email"
                  className="grow ms-4 font-normal"
                  placeholder="Daisy"
                  name="email"
                  onChange={handleInput}
                />
              </label>
            </div>
            <div>
              <label className="input input-bordered flex items-center font-semibold">
                Username
                <input
                  type="text"
                  name="username"
                  className="grow ms-4 font-normal"
                  placeholder="Daisy"
                  onChange={handleInput}
                />
              </label>
            </div>
          </div>
          <div className="my-4 grid grid-cols-1 gap-4">
            <div>
              <label className="input input-bordered flex items-center font-semibold">
                Password
                <input
                  type={isHide ? 'password' : 'text'}
                  className="grow ms-4 font-normal"
                  placeholder="Password"
                  name="password"
                  onChange={checkPasswordStrength}
                />
              </label>
              {
                passwordStrengthValue.length > 0 ? (
                    <div className="ms-2 mt-2">Your Password is {passwordStrengthValue.value}</div>
                ):(
                    ''
                )
              }
              <div className="flex mt-4 mb-2">
                <input type="checkbox" className="ms-2 me-3 checkbox" onChange={() => setHide(!isHide)}/>
                Show Password
              </div>
            </div>
            <button
              type="button"
              className="btn bg-slate-500 font-bold text-base text-white hover:bg-slate-400" onClick={processRegister}
            >
              Register Now !
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
