import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard(props) {
  const [data, setData] = useState([]);

  const getDashboardData = async () => {
    await fetch("http://localhost:4000/dashboard", {
      method: "GET",
      headers: {
        "Authorization": props.token
      }
    })
      .then((resp) => resp.json())
      .then((result) => {
        setData(result.data);
        props.refreshToken(result.token);
      }).catch((err) => {
        console.log(err.message);
        alert(err.message)
      });
  };

  useEffect(() => {
    props.setPageTitle("Dashboard");
    getDashboardData();
  }, []);

  return (
    <>
      <div className="grid gap-2 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        <Link
          to={"/order/all"}
          className=" border-solid bg-slate-50 rounded-lg shadow-lg px-5 py-4 flex hover:translate-y-[-5px] hover:shadow-2xl transition-all"
        >
          <div className="block">
            <p className=" text-xl">Jumlah Pesanan</p>
            <br />
            <p className="mt-[-15px] fw-bold text-5xl">{data.jumlahPesanan}</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-12 ms-auto my-auto me-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
            />
          </svg>
        </Link>
        <Link
          to={"/order/waiting"}
           className=" border-solid bg-slate-50 rounded-lg shadow-lg px-5 py-4 flex hover:translate-y-[-5px] hover:shadow-2xl transition-all"
        >
          <div className="block">
            <p className=" text-xl">Menunggu Proses</p>
            <br />
            <p className="mt-[-15px] fw-bold text-5xl">{data.menungguProses}</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-12 ms-auto my-auto me-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
            />
          </svg>
        </Link>
      </div>
    </>
  );
}

export default Dashboard;
