import React, { useEffect, useState, useContext } from "react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
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
  const { token, setToken, refreshToken } = useContext(AuthContext);
  return (
    <AuthProvider>
      <div className="bg-slate-200 h-screen w-screen max-h-screen overflow-auto">
        <Routes>
          <Route element={<ProtectedPages setPageTitle={props} />}>
            <Route
              path="/dashboard"
              index={true}
              element={
                <Dashboard
                  setPageTitle={props.setPageTitle}
                  token={token}
                  refreshToken={refreshToken}
                />
              }
            />
            <Route
              path="/addproduct"
              element={<AddProduct setPageTitle={props.setPageTitle} />}
            />
            <Route
              path="/listproduct"
              element={
                <ListProduct
                  setPageTitle={props.setPageTitle}
                  token={token}
                  refreshToken={refreshToken}
                />
              }
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
              <Route path="all" index element={<AllOrder />} />
              <Route path="waiting" element={<PendingOrder />} />
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
          <Route
            path="*"
            element={<NotFound setPageTitle={props.setPageTitle} />}
          />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default Pages;
