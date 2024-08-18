import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Refresh from "../Token/Refresh";


const AllOrder = () => {
  const [data, setData] = useState([]);
  async function getData() {
    await fetch("http://localhost:4000/order/all", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
        console.log(data);
      });
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
    <Refresh/>
      <div className="overflow-x-auto grid grid-cols-1 gap-3">
        {data.length > 0 ? (
          <div className="w-full border rounded">
            <div className="bg-slate-200 w-full grid grid-cols-2 gap-3 p-1 font-semibold rounded px-3 text-slate-700">
              <div className="">
                No. Pesanan : 8458dbbe-b909-4748-ba54-8c8bffc77f6d
              </div>
              <div className=" place-content-end flex">
                Order Date : 27/07/2024
              </div>
            </div>
            <div className="grid-cols-3 py-4 px-3"></div>
          </div>
        ) : (
          <div className="w-full border rounded">
            <div className="bg-slate-200 w-full flex place-content-center p-5 font-semibold rounded px-3 text-slate-700">
              <div className="block text-center">
                <p className="font-bold text-5xl">?</p>
                <br />
                <p className="font-semibold mt-[-20px]">No Data</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllOrder;
