import React, { useEffect, useState, useContext } from "react";
import { Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";
import AddProduct from "../../Components/Product/AddProduct";
import ListProduct from "../../Components/Product/ListProduct";
import Dashboard from "../Dashboard";
import StockProduct from "../../Components/Product/StockProduct";
import ViewProduct from "../../Components/Product/ViewProduct";
import OrderList from "../../Components/Orders/OrderList";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import ProtectedPages from "./ProtectedPages";
import { AuthProvider } from "../../../Context/AuthContext";
import NotFound from "../NotFound";
import AllOrder from "../../Components/Orders/AllOrder";
import PendingOrder from "../../Components/Orders/PendingOrder";
import { AuthContext } from "../../../Context/AuthContext";

const Pages = (props) => {
  const currLocation = useLocation();
  const {token} = useContext(AuthContext);
  return (
    <AuthProvider>
      {
        token ? currLocation.pathname == '/login' ? <Navigate to={'/dashboard'} /> : (currLocation.pathname == '/' ? <Navigate to={'/dashboard'} /> : '') : <Navigate to={'/login'} />
      }
      <div className="bg-slate-200 h-screen w-screen py-5 max-h-screen overflow-auto">
        <div className="px-8 pb-8">
          <div className="border-b-2 border-slate-500 pb-2 lg:w-full lg:m-0 md:w-72 md:m-auto sm:w-72 sm:m-auto max-[640px]:m-auto max-[640px]:w-48">
            <h1 className="text-3xl font-semibold lg:text-start md:text-center sm:text-center max-[640px]:text-center">{`${props.pageTitle}`}</h1>
          </div>
          <div className="mt-4 mb-8">
            <Routes>
              <Route element={<ProtectedPages />}>
                <Route
                  path="/dashboard"
                  index={true}
                  element={<Dashboard setPageTitle={props.setPageTitle} />}
                />
                <Route
                  path="/addproduct"
                  element={<AddProduct setPageTitle={props.setPageTitle} />}
                />
                <Route
                  path="/listproduct"
                  element={<ListProduct setPageTitle={props.setPageTitle} />}
                />
                <Route
                  path="/stockproduct"
                  element={<StockProduct setPageTitle={props.setPageTitle} />}
                />
                <Route
                  path="/product/:id"
                  element={<ViewProduct setPageTitle={props.setPageTitle} />}
                />
                <Route
                  path="/order/"
                  element={<OrderList setPageTitle={props.setPageTitle} />}
                >
                  <Route path="all" index element={<AllOrder/>} />
                  <Route path="waiting" element={<PendingOrder/>} />
                </Route>
              </Route>
              <Route
                path="/"
                element={<Login setPageTitle={props.setPageTitle} />}
              />
              <Route
                path="/login"
                element={<Login setPageTitle={props.setPageTitle} />}
              />
              <Route
                path="/register"
                element={<Register setPageTitle={props.setPageTitle} />}
              />
              <Route path="*" element={<NotFound setPageTitle={props.setPageTitle}/>} />
            </Routes>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default Pages;
