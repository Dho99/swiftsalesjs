import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import Login from "../Auth/Login";

const ProtectedPages = () => {
  const { token, setToken } = useContext(AuthContext);
  const verifyClientToken = async (clientToken) => {
    await fetch("http://localhost:4000/verifyToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(clientToken),
    })
    .then((res) => res.json())
    .then((result) => {
        if (!result.success) {
          localStorage.removeItem("token");
          setToken(null);
          window.location.href = "/login";
        }
      });
  };

  const clientToken = {
    ctoken: token,
  };
  // verifyClientToken(clientToken);

  return <>{token ? <Outlet /> : <Navigate to={"/login"} replace={true} />}</>;
};

export default ProtectedPages;
