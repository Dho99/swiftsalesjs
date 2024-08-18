import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Refresh from "../Token/Refresh";

function ListProduct(props) {
  const [products, setProducts] = useState({
    data: [],
    isEdit: false,
  });

  useEffect(() => {
    props.setPageTitle("Daftar Produk");
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProduct = async () => {
    await fetch("http://localhost:4000/product/all", {
      method: "GET",
      headers: {
        'Authorization': props.token
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        props.refreshToken(data.token);
        setProducts({ ...products, data: data.data, isEdit: false });
        document.querySelector('.grow').value = '';
      });
  };

  const deleteProduct = async (productId) => {
    if (confirm("Apakah anda yakin akan menghapus produk ini ?")) {
      await fetch(`http://localhost:4000/product/${productId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((msg) => {
          getProduct();
        });
    } else {
      alert("Produk batal dihapus");
    }
  };

  const filterProduct = (e) => {
    if (e.keyCode == 13) {
      if (e.target.value == "") {
        e.preventDefault();
      } else {
        let filtered = products.data.filter(
          (product) => product.name == e.target.value
        );
        setProducts({ ...products, data: filtered, isEdit: true });
      }
    }
  };

  return (
    <div className="static">
      <Refresh/>
      <div className="bg-white rounded-lg p-5 overflow-hidden ">
        <div className="mb-5 flex ms-auto">
          <div className="flex ms-auto">
            {products.isEdit ? (
              <button
                className="btn btn-sm w-fit me-1 bg-red-500 text-white hover:bg-red-600"
                onClick={getProduct}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </button>
            ) : (
              <></>
            )}
            <label className="input input-sm input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Search Product Name"
                onKeyUp={(e) => filterProduct(e)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-slate-400 text-white">
              <tr className="text-sm">
                <th className="ps-[100px]">Nama</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th className="ps-9">Status</th>
                <th className="ps-[60px]">Aksi</th>
              </tr>
            </thead>
            {products.data.length > 0 ? (
              <tbody>
                {products.data.map((o, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img src={o.image} alt="Product Image" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{o.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-ghost badge-sm">
                          {o.category}
                        </span>
                      </td>
                      <td>
                        {o.new_price > 1 ? (
                          <div>
                            <div className="line-through text-red-500">
                              {o.old_price}
                            </div>
                            <div>{o.new_price}</div>
                          </div>
                        ) : (
                          <div>{o.old_price}</div>
                        )}
                      </td>
                      <td className="">
                        {o.available ? (
                          <div className="w-max px-3 py-1 rounded-2xl font-semibold text-xs bg-green-200 hover:cursor-default">
                            Tersedia
                          </div>
                        ) : (
                          <div className="w-max px-3 py-1 rounded-2xl font-semibold text-xs bg-red-200">
                            Tidak Tersedia
                          </div>
                        )}
                      </td>
                      <td className="grid grid-cols-2 w-48 pe-0 py-6">
                        <Link className="btn btn-xs" to={`/product/${o._id}`}>
                          Details
                        </Link>
                        <button
                          className="btn btn-xs bg-red-500 text-white hover:bg-red-700"
                          onClick={() => deleteProduct(o.id)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td
                    colSpan={5}
                    className="text-center text-xl font-bold text-slate-400"
                  >
                    No Data
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
      <Link
        className="btn absolute lg:bottom-6 md:bottom-6 bottom-3 lg:right-8 md:right-5 sm:right-8 right-3.5 bg-blue-400 shadow lg:w-56 md:w-56 w-11/12 text-white hover:bg-blue-500 text-base"
        to={"/addproduct"}
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
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        Add Product
      </Link>
    </div>
  );
}

export default ListProduct;
