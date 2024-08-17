import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";

const Refresh = () => {
  const { token, setToken, refreshToken } = useContext(AuthContext);
  useEffect(() => {
    verifyToken();
  }, []);
  const verifyToken = async () => {
    await fetch("http://localhost:4000/token/verify", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.success) {
          const jwtErrType = result.type;
          if (jwtErrType == "TokenExpiredError") {
            localStorage.removeItem("token");
            setToken(null);
          }
          window.location.href = "/login";
          console.log(result.message);
        } else {
          refreshClientToken(token);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //   refreshClientToken
  const refreshClientToken = async (token) => {
    await fetch("http://localhost:4000/token/refresh", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if(!result.success){
            console.log({
                "type": result.type,
                "message": result.message
            });
            setToken(null);
            localStorage.removeItem("token");
            window.location.href = "/login";

        }else{
            console.log(result);
            refreshToken(result.data);
        }
      })
      .catch((err) => console.log(err.message));
  };

  return <></>;
};

export default Refresh;
