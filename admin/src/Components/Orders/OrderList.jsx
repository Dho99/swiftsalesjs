import React, { useEffect } from "react";
import { useNavigate, Outlet, NavLink, useLocation, useLoaderData } from "react-router-dom";

const OrderList = (props) => {
  const navTo = useNavigate();
  const location = useLocation();
  useEffect(() => {
    props.setPageTitle("Daftar Pesanan");
    if(location.pathname == '/order'){
      navTo("/order/all");
    }
  }, []);


  return (
    <>
      <div className="bg-slate-100 rounded">
        <div
          role="tablist"
          className="tabs tabs-boxed overflow-auto w-full bg-slate-100"
        >
          <NavLink
            to={"/order/all"}
            role="tab"
            className={({ isActive }) =>
              (isActive ? "bg-blue-400 text-white font-bold" : "font-normal hover:bg-blue-200") + " tab flex w-auto transition-all h-12 text-base hover:font-semibold hover:text-white "
            }
          >
            Semua Pesanan
          </NavLink>
          <NavLink
            to={"/order/waiting"}
            role="tab"
            className={({ isActive }) =>
              (isActive ? "bg-blue-400 text-white font-bold" : "font-normal hover:bg-blue-200") + " tab flex w-auto transition-all h-12 text-base hover:font-semibold hover:text-white "
            }
          >
            Menunggu Proses
          </NavLink>
          <NavLink
            to={"/order/cancel"}
            role="tab"
            className={({ isActive }) =>
              (isActive ? "bg-blue-400 text-white font-bold" : "font-normal hover:bg-blue-200") + " tab flex w-auto transition-all h-12 text-base hover:font-semibold hover:text-white "
            }
          >
            Dikirim
          </NavLink>
          <NavLink
            to={"/order/cancel"}
            role="tab"
            className={({ isActive }) =>
              (isActive ? "bg-blue-400 text-white font-bold" : "font-normal hover:bg-blue-200") + " tab flex w-auto transition-all h-12 text-base hover:font-semibold hover:text-white "
            }
          >
            Batal
          </NavLink>
        </div>
      </div>
      <div className="mt-2 bg-slate-100 rounded p-4">
        {/* dss */}
        <Outlet />
      </div>
    </>
  );
};

export default OrderList;
