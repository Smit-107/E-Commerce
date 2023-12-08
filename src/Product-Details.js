import "./App.css";
import React, { useEffect, useState } from "react";
import { FaMagnifyingGlass, FaRegBell, FaDollarSign } from "react-icons/fa6";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { passData } from "./app/counter/counterSlice";
import { BsCheckCircleFill } from "react-icons/bs";

function ProductDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  let [ProductDetails, setProductDetails] = useState([]);
  let [mainImg, setmainImg] = useState("");
  let [allImg, setallImg] = useState([]);
  let [loader, setloader] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 2000);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${params.abc}`)
      .then((response) => {
        setProductDetails(response.data);
        setmainImg(response.data.thumbnail);
        setallImg(response.data.images);
        setloader(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.abc]);

  return (
    <div>

      {loader && (
        <div className=" my-8 mx-8">
          <div className="bg-white p-8 rounded-lg shadoww flex">
            <div className="w-1/2 p-4">
              <img
                src={mainImg}
                alt="Product Image"
                className="w-3/5 m-auto object-fill h-56 shadoww border-4 p-2 border-double border-black"
              />
              <div className="grid grid-cols-3 gap-3 pt-10  px-10 mx-10">
                {allImg.map((valImg, id) => (
                  <img
                    key={id}
                    src={valImg}
                    onClick={() => {
                      setmainImg(valImg);
                    }}
                    alt="Additional Image 2"
                    className="m-auto border border-black p-1 w-28 h-20 "
                  />
                ))}
              </div>
            </div>

            <div className="w-1/2 pl-8">
              <h2 className="product-title text-3xl font-semibold mb-4">
                {ProductDetails.title}
              </h2>
              <p className="product-description text-gray-700 mb-4">
                {ProductDetails.description}
              </p>
              <div className="mb-4">
                <div className=" mb-1">
                  <span className="product-price font-semibold">
                    ${ProductDetails.price}
                  </span>
                  <span className="">
                    {" "}
                    ({ProductDetails.discountPercentage} % off)
                  </span>
                </div>
                <p className="product-rating">
                  Rating: ⭐⭐⭐⭐⭐ ({ProductDetails.rating} out of 5 stars)
                </p>
              </div>
              <div className="mb-4">
                <p className="product-highlight  font-semibold">
                  Product Details:
                </p>
                <ul className="list-disc list-inside">
                  <li>Brand: {ProductDetails.brand}</li>
                  <li>Category: {ProductDetails.category}</li>
                </ul>
              </div>
              <div className="mb-4">
                <button
                  onClick={() => {
                    dispatch(passData(ProductDetails));
                    openModal();
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
                >
                  Add to Cart
                </button>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 ml-2">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {!loader && (
        <div>
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className={`modal active`}>
          <div className="modal-content">
            <div className=" bg-green-200 text-green-800 border-b-4 border-green-600 p-4  ">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 flex items-center text-green-600">
                    <BsCheckCircleFill className="h-8 w-8" />
                  </div>
                  <div className="ms-3">
                    <p className="font-bold">Success</p>
                    <p>Iteam Add Successfully.</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  <svg
                    className="h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M21.293 2.293a1 1 0 010 1.414L3.707 22.707a1 1 0 01-1.414-1.414L19.293 1.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M1.293 1.293a1 1 0 011.414 0L22.707 19.293a1 1 0 010 1.414L19.293 22.707a1 1 0 01-1.414-1.414L1.293 2.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
