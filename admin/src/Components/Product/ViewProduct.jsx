import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import noImage from "../../assets/Images/no-image.jpeg";

const ViewProduct = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    image: "",
    category: "",
    new_price: "",
    old_price: "",
  });
  const [isEdit, setEdit] = useState(false);
  const options = ["Baju", "Celana", "Aksesoris", "Pria", "Wanita", "Celana"];
  const [image, setImage] = useState({
    name:"",
  });
  // const [imageUrl, setImageUrl] = useState('');


  const uploadImage = async (e) => {
    let imageFile = e.target.files[0];
    if(imageFile.name.length > 1){
      if(imageFile.name != image.name){
        const fd = new FormData();
        fd.append("product", imageFile);
         await fetch("http://localhost:4000/product/upload/image", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: fd,
        })
          .then((res) => res.json())
          .then((data) => {
            setProduct({
              ...product,
              image: data.image_url
            });
            setImage({
              name: data.image_filename
            });
          });
        }
      }
    };

  const changeHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const setChanges = async (e) => {
    if (isEdit) {
      await fetch(`http://localhost:4000/product/${product.id}`,{
        method: 'PUT',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify(product)
      }).then((res) => res.json())
      .then((msg) => {
        alert(msg.message);
        navigate('/listproduct');
      });
      
    } else {
      setEdit(!isEdit);
    }
  };

  const productImage = () => {
    
  }

  useEffect(() => {
    fetch(`http://localhost:4000/product/${params.id}`, {
      method: "GET",
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data[0]);
        props.setPageTitle(`Detail data produk ${product.name}`);
        console.log(data);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white rounded-lg p-5 overflow-auto">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-7 mb-5 gap-y-3">
        {/* <p>{product.category}</p> */}
        <div className="w-full">
          <div className="label">
            <div className="label-text">Nama Produk</div>
          </div>
          <input
            type="text"
            className="input input-bordered bordered w-full text-sm"
            placeholder="Type Here"
            value={product.name}
            // readOnly
            onChange={changeHandler}
            readOnly={isEdit ? false : true}
            name="name"
          />
        </div>
        <div className="w-full">
          <div className="label">
            <div className="label-text">Kategori Produk</div>
          </div>
          <select
            className="select select-bordered w-full"
            disabled={isEdit ? false : true}
            name="category"
            onChange={changeHandler}
            // disabled={isEdit?false:true}
          >
            <option disabled selected>
              Choose Category
            </option>
            {options.map((opt, index) => (
              <option
                key={index}
                selected={opt == product.category ? true : false}
              >
                {opt}
              </option>
            ))}
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
              value={product.old_price}
              readOnly={isEdit ? false : true}
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
              value={product.new_price}
              readOnly={isEdit ? false : true}
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
              value={product.stock}
              onChange={changeHandler}
              readOnly={isEdit ? false : true}
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
              disabled={isEdit ? false : true}
              onChange={(e) => uploadImage(e)}
              name="image"
            />
          </div>
        </div>

        {/* <div className="w-full grid grid-cols-1">
          <div className="label">
            <div className="label-text">Pratinjau Gambar</div>
          </div>
          <div className="border rounded-md max-h-96 h-full overflow-auto"> */}
          {productImage}
            {/* <img
              src={product.image ? product.image : noImage}
              // src={image ? URL.createObjectURL(image) : noImage}
              className="flex justify-center"
              alt={`Product Image`}
            /> */}
          {/* </div>
        </div> */}
        
      </div>
      <div className="w-full pt-4 pb-3 flex">
        {/* <button className="btn hover:btn-ghost">Kembali</button> */}
        <button
          className="btn bg-blue-400 text-white flex ms-auto w-56 hover:bg-blue-500"
          onClick={() => setChanges()}
        >
          {isEdit ? "Simpan" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default ViewProduct;
