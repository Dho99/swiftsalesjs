import React, { useState, useEffect, act } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import "./Sidebar.css";
// import Cookies from 'universal-cookie';

function Sidebar(props) {
  const handleSidebar = (e) => {
    e.preventDefault();
    props.handleSidebar();
  };

  const handleSidebarMdBreakpoints = () => {
    if (props.breakpoints == "md") {
      props.handleSidebar();
    }
  };

  const resetAccordion = (id) => {
    document.querySelector(`input${id}`).checked = true;
  };

  return (
    <>
      <div
        className={` bg-slate-600 absolute left-60 ease-in-out duration-300 rounded-r-lg mt-2 drop-shadow-lg hover:drop-shadow-2xl lg:hidden md:block sm:block z-50 ${
          props.isCollapsed ? "-translate-x-60" : "block"
        }`}
      >
        <div className={`${props.isCollapsed ? "block" : "lg:hidden"}`}>
          <label
            className="btn btn-ghost my-auto swap swap-rotate w-14 rounded-l-none text-white"
            onClick={handleSidebar}
          >
            <input type="checkbox" />

            <svg
              className={`fill-current ${
                props.isCollapsed ? "block" : "hidden"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>

            <svg
              className={` fill-current ${
                props.isCollapsed ? "hidden" : " block"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          </label>
        </div>
      </div>

      {/* Sidebar Start */}
      <div
        className={`overflow-auto bg-slate-300 max-w-60 py-5 px-2 ease-in-out duration-300 drop-shadow-xl lg:relative md:absolute sm:absolute max-[640px]:absolute h-screen z-10 ${
          props.isCollapsed ? "-translate-x-60" : "block"
        }`}
      >
        <NavLink
          to="/dashboard"
          replace={true}
          style={{ textDecoration: "none" }}
          // className="w-full btn no-animation hover:bg-blue-300 border-none rounded-2xl border shadow justify-start gap-x-4 hover:justify-start hover:gap-x-4 font-medium text-base mb-2 h-14 hover:text-base hover:text-white"
          className={({ isActive }) =>
            (isActive ? "bg-blue-300 text-white text-base" : "") +
            " w-full btn no-animation hover:bg-blue-300 border-none rounded-2xl border shadow justify-start gap-x-4 hover:justify-start hover:gap-x-4 font-medium text-base mb-2 h-14 hover:text-base hover:text-white"
          }
          id="dashboard"
          onClick={() => {
            handleSidebarMdBreakpoints();
            // props.changePageTitle("Dashboard");
            resetAccordion("#dashboardRadio");
          }}
        >
          <input
            type="radio"
            name="my-accordion"
            className="hidden "
            id="dashboardRadio"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          Dashboard
        </NavLink>

        <div className="collapse collapse-arrow bg-base-200 mb-2 max-w-full w-96">
          <input type="radio" name="my-accordion" />
          <div className="collapse-title text-base font-medium gap-x-3 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
              />
            </svg>
            Pesanan
          </div>
          <div className="collapse-content px-2 gap-y-1 grid mt-[-10px]">
            <NavLink
              to={"/order/all"}
              style={{ textDecoration: "none" }}
              className={({ isActive }) =>
                (isActive ? "bg-blue-300 text-white text-base" : "") +
                " w-full btn btn-ghost border shadow justify-start gap-x-4 hover:bg-blue-300 hover:justify-start hover:gap-x-4 hover:text-base hover:text-white"
              }
              id="addProduct"
              onClick={() => {
                handleSidebarMdBreakpoints();
                // props.changePageTitle("Tambah Data Produk");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />
              </svg>
              Daftar Pesanan
            </NavLink>

          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200 mb-2 max-w-full w-96">
          <input type="radio" name="my-accordion" />
          <div className="collapse-title text-base font-medium gap-x-3 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
            Kelola Produk
          </div>
          <div className="collapse-content px-2 gap-y-1 grid mt-[-10px]">
            <NavLink
              to={"/addproduct"}
              style={{ textDecoration: "none" }}
              className={({ isActive }) =>
                (isActive ? "bg-blue-300 text-white text-base" : "") +
                " w-full btn btn-ghost border shadow justify-start gap-x-4 hover:bg-blue-300 hover:justify-start hover:gap-x-4 hover:text-base hover:text-white"
              }
              id="addProduct"
              onClick={() => {
                handleSidebarMdBreakpoints();
                // props.changePageTitle("Tambah Data Produk");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />
              </svg>
              Add Product
            </NavLink>

            <NavLink
              to={"/listproduct"}
              style={{ textDecoration: "none" }}
              className={({ isActive }) =>
                (isActive ? "bg-blue-300 text-white text-base" : "") +
                " w-full btn btn-ghost border shadow justify-start gap-x-4 hover:bg-blue-300 hover:justify-start hover:gap-x-4 hover:text-base hover:text-white"
              }
              id="listProduct"
              onClick={() => {
                handleSidebarMdBreakpoints();
                // props.changePageTitle("Daftar Produk");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />
              </svg>
              List Product
            </NavLink>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion" />
          <div className="collapse-title text-base font-medium gap-x-4 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
              />
            </svg>
            Pengelolaan
          </div>
          <div className="collapse-content">
            <NavLink
              to={"/stockproduct"}
              style={{ textDecoration: "none" }}
              className={({ isActive }) =>
                (isActive ? "bg-blue-300 text-white text-base" : "") +
                " w-full btn btn-ghost border shadow justify-start gap-x-4 hover:bg-blue-300 hover:justify-start hover:gap-x-4 hover:text-base hover:text-white"
              }
              id="stockProduct"
              onClick={() => {
                handleSidebarMdBreakpoints();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />
              </svg>
              Stok Produk
            </NavLink>
          </div>
        </div>
        {/* Sidebar End */}
      </div>
    </>
  );
}

export default Sidebar;
