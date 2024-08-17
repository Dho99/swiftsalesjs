import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import Login from "../Auth/Login";
import Refresh from "../../Components/Token/Refresh";

const ProtectedPages = (props) => {
  const { token, setToken } = useContext(AuthContext);
  // const verifyClientToken = async (clientToken) => {
  //   await fetch("http://localhost:4000/verifyToken", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       "Authorization": token,
  //     },
  //     body: JSON.stringify(clientToken),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       if (!result.success) {
  //         localStorage.removeItem("token");
  //         setToken(null);
  //         window.location.href = "/login";
  //       }
  //     });
  // };

  const clientToken = {
    ctoken: token,
  };
  // verifyClientToken(clientToken);

  return (
    <>
      {token ? (
        <div className="px-8 pb-8 py-5">
          <div className="border-b-2 border-slate-500 pb-2 lg:w-full lg:m-0 md:w-72 md:m-auto sm:w-72 sm:m-auto max-[640px]:m-auto max-[640px]:w-48">
            <h1 className="text-3xl font-semibold lg:text-start md:text-center sm:text-center max-[640px]:text-center">{props.setPageTitle.pageTitle}</h1>
          </div>
          <div className="mt-3">
            <Refresh/>
            <Outlet />
          </div>
        </div>
      ) : (
        <Navigate to={"/login"} replace={true} />
      )}
    </>
  );
};

export default ProtectedPages;
