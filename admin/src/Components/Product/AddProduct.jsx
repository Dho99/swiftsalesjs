import React, { useState, useEffect, useRef } from "react";
import noImage from "../../assets/Images/no-image.jpeg";
import { useNavigate } from "react-router-dom";

const AddProduct = (props) => {
  useEffect(() => {
    props.setPageTitle("Tambah Data Produk");
  }, [props]);

  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "woman",
    new_price: "",
    old_price: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  let responseData = {};
  const uploadImage = async () => {
    if (responseData.image_filename !== image.name) {
      const formData = new FormData();
      formData.append("product", image);
      await fetch("http://localhost:4000/product/upload/image", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          responseData = data;
        });
    }

    return responseData;
  };

  const submitProduct = async () => {
    let product = productDetails;

    if (product.stock < 1 || product.stock == "") {
      alert("Stok wajib diisi");
    } else if (product.old_price < product.new_price) {
      alert("Harga diskon tidak boleh melebihi harga awal");
    } else {
      let uploadImageResult = await uploadImage();
      product.image = uploadImageResult.image_url;
      if (uploadImageResult.success) {
        await fetch("http://localhost:4000/product/create", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        })
          .then((response) => response.json())
          .then((data) => {
            data.success
              ? (alert("Product Added Succesfully"), navigate("/listproduct"))
              : alert(data.message);
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        alert("Image Field is Required");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg p-5 overflow-auto">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-7 mb-5 gap-y-3">
        <div className="w-full">
          <div className="label">
            <div className="label-text">Nama Produk</div>
          </div>
          <input
            type="text"
            className="input input-bordered bordered w-full text-sm"
            placeholder="Type Here"
            value={productDetails.name}
            onChange={changeHandler}
            name="name"
          />
        </div>
        <div className="w-full">
          <div className="label">
            <div className="label-text">Kategori Produk</div>
          </div>
          <select
            className="select select-bordered w-full"
            onChange={changeHandler}
            name="category"
            defaultValue={""}
          >
            <option disabled value={""}>
              Choose Category
            </option>
            <option value="Baju">Baju</option>
            <option value="Celana">Celana</option>
            <option value="Aksesoris">Aksesoris</option>
            <option value="Pria">Pria</option>
            <option value="Wanita">Wanita</option>
          </select>
        </div>

        <div className="grid lg:grid-cols-1 gap-y-3">
          <div className="w-full">
            <div className="label">
              <div className="label-text">Harga Produk</div>
            </div>
            <input
              type="text"
              className="input input-bordered bordered w-full py-2"
              placeholder="Type Here"
              value={productDetails.old_price}
              onChange={changeHandler}
              name="old_price"
            />
          </div>
          <div className="w-full">
            <div className="label">
              <div className="label-text">Harga Diskon</div>
            </div>
            <input
              type="text"
              className="input input-bordered bordered w-full py-2"
              placeholder="Type Here"
              value={productDetails.new_price}
              onChange={changeHandler}
              name="new_price"
            />
          </div>
          <div className="w-full">
            <div className="label">
              <div className="label-text">Stok Produk</div>
            </div>
            <input
              type="number"
              className="input input-bordered bordered w-full py-2"
              placeholder="Type Here"
              value={productDetails.stock}
              onChange={changeHandler}
              name="stock"
            />
          </div>
          <div className="w-full">
            <div className="label">
              <div className="label-text">Gambar Produk</div>
            </div>
            <input
              type="file"
              className="input input-bordered bordered w-full py-2"
              placeholder="Type Here"
              onChange={imageHandler}
              name="image"
            />
          </div>
        </div>

        <div className="w-full grid grid-cols-1">
          <div className="label">
            <div className="label-text">Pratinjau Gambar</div>
          </div>
          <div className="border rounded-md max-h-96 h-full overflow-auto">
            <img
              src={image ? URL.createObjectURL(image) : noImage}
              className="flex justify-center"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="w-full pt-4 pb-3 flex">
        {/* <button className="btn hover:btn-ghost">Kembali</button> */}
        <button
          className="btn bg-blue-400 text-white flex ms-auto w-56 hover:bg-blue-500"
          onClick={() => submitProduct()}
        >
          Simpan
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
