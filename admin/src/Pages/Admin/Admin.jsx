import React, { useState, useEffect, useContext } from "react";
import "./Admin.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import NavComponent from "../../Components/Navbar/Navbar";
import Pages from "./Pages";
import Cookies from "universal-cookie";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";

function Admin() {
  const [isSidebarCollapsed, setCollapse] = useState(false);
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const [breakpoints, setBreakpoints] = useState("");
  const { token, loading } = useContext(AuthContext);
  const handleSidebar = () => {
    setCollapse(!isSidebarCollapsed);
  };
  const nav = useNavigate();
  const [tokenAvailable, setAvailable] = useState(false);

  useEffect(() => {
    console.log(token);
    if(token == 'undefined'){
      setAvailable(false);
    }else if(token == null){
      setAvailable(false);
    }else{
      setAvailable(true);
    }
    const handleWhileResize = () => {
      let screenWidth = window.innerWidth;
      if (screenWidth < 1000) {
        setCollapse(true);
        setBreakpoints("md");
      } else {
        setCollapse(false);
        setBreakpoints("");
      }
    };
    window.addEventListener("resize", handleWhileResize);
    return () => {
      window.removeEventListener("resize", handleWhileResize);
    };
  }, []);

  const changePageTitle = (title) => {
    setPageTitle(title);
  };

  return (
    <>
      <div className="max-h-screen h-full overflow-hidden">
        {tokenAvailable ? (
          <NavComponent
            isCollapsed={isSidebarCollapsed}
            changePageTitle={changePageTitle}
          />
        ) : (
          ""
        )}
        <div className="flex">
          {tokenAvailable ? (
            <Sidebar
              isCollapsed={isSidebarCollapsed}
              handleSidebar={handleSidebar}
              breakpoints={breakpoints}
              changePageTitle={changePageTitle}
            />
          ) : (
            ""
          )}

          <Pages
            isCollapsed={isSidebarCollapsed}
            pageTitle={pageTitle}
            setPageTitle={setPageTitle}
          />
        </div>
      </div>
    </>
  );
}

export default Admin;
