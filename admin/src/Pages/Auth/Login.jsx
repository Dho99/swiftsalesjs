import React, { useEffect, useState } from "react";
import Logo from "../../assets/Images/logo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { AuthContext } from "../../../Context/AuthContext";
import { useContext } from "react";
// import Cookies from "universal-cookie";

function Login(props) {
  useEffect(() => {
    props.setPageTitle('Login');
  },[])

  const {setToken, setUid} = useContext(AuthContext);
  const [isHide, setHide] = useState(true);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  // const cookies = new Cookies();
  const navigateTo = useNavigate();

  const hanldeInputLogin = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const proccessLogin = async() => {
    if(userData.email != '' || userData.password != ''){
      await fetch('http://localhost:4000/login', {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      }).then((resp) => resp.json()).then((konz) => {
        console.log(konz)
        if(konz.success){
          setToken(konz.token);
          localStorage.setItem("token",konz.token);
          window.location.href = '/dashboard';
         
        }else{
          setToken(null);
          localStorage.removeItem("token")
          alert(konz.message);
        }
      });
    }else{
      alert('Form wajib diisi');
    }
  };

  const doLogin = (e) => {
    if(userData.email != '' || userData.password != ''){
      if(e.code == 'Enter'){
        proccessLogin();
      }
    }
  } 

  return (
    <div>
    {/* <div className="h-[100vh] grid grid-cols-1 content-center m-auto w-full bg-slate-300"> */}
      {/* {users} */}
      <div className="bg-slate-500 lg:w-[450px] md:w-[450px] sm:w-[300px] flex m-auto rounded pt-6 pb-10">
        <div className="block w-5/6 m-auto">
          <img src={Logo} alt="" className="w-56 m-auto mb-5" />
          <h1 className="text-3xl font-bold text-center pb-5 text-white">
            Login
          </h1>
          <div className="grid grid-cols-1 gap-y-3 relative">
            <label className="input input-bordered rounded flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-5 opacity-70 absolute"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                className="grow ms-10"
                placeholder="Email"
                name="email"
                onChange={hanldeInputLogin}
              />
            </label>
            <label className="input input-bordered rounded flex items-center gap-2 relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 opacity-70 absolute"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                />
              </svg>

              <input
                type={isHide ? "password" : "text"}
                className="grow ms-10"
                placeholder="Password"
                name="password"
                onChange={hanldeInputLogin}
                onKeyUp={doLogin}
              />

              <button
                type="button"
                className="absolute right-1 btn bg-transparent no-animation hover:bg-transparent border-0 w-18"
                onClick={() => setHide(!isHide)}
              >
                {isHide ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 opacity-70"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 opacity-70"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
              </button>
            </label>
            <button
              type="button"
              onClick={proccessLogin}
              className="btn w-1/2 m-auto mt-3 bg-slate-200 rounded-full"
              id="signinBtn"
            >
              Sign in
            </button>
            <div className="relative w-full my-3">
              <div className="border-slate-300 border">
                <div className="absolute top-[-11px] lg:left-[165px] md:left-[165px] sm:left-[105px] left-[95px] bg-slate-500 rounded px-3 font-bold text-white">
                  OR
                </div>
              </div>
            </div>
            <Link to={"/register"} className="btn btn-outline border-slate-300 w-1/2 hover:bg-slate-400 hover:border-none m-auto rounded-full text-white">
              Register Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
