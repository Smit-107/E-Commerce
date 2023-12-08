import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  removeFromCart,
  resetCart,
} from "./app/counter/counterSlice";
import { BsCheckCircleFill, BsDash, BsPlusLg } from "react-icons/bs";
import { CgDanger } from "react-icons/cg";

const Cart = () => {
  const cnt = useSelector((state) => state.counter.no);
  const cnt11 = useSelector((state) => state.counter.total);
  let [loader2, setloader2] = useState(true);

  // let totalAmount = 0;

  // cnt.forEach((item) => {
  //   totalAmount += item.price * item.iteam;
  // });

  // cnt.forEach((item) => {
  //   totalAmount += item.price * item.iteam;
  // });

  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);

    setTimeout(() => {
      setIsModalOpen(false);
    }, 2000);
  };

  const openModal2 = () => {
    setIsModalOpen2(true);

    setTimeout(() => {
      setIsModalOpen2(false);
    }, 2000);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
  };

  let Shipping = 10.0;

  return (
    <div>
      {loader2 && (
        <div className="bg-gray-100">
          <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

            <div className="mt-8 mb-8 bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Cart Summary</h2>
              <div className="mt-4 flex justify-between">
                <p>Sub Total:</p>
                <p>${cnt11}</p>
              </div>
              <div className="mt-2 flex justify-between">
                <p>Shipping:</p>
                <p>${cnt11 === 0 ? "0" : Shipping}</p>
              </div>
              <div className="mt-4 flex justify-between">
                <p className="font-semibold">Total:</p>
                <p className="text-red-600 text-lg font-semibold">
                  ${cnt11 === 0 ? "0" : cnt11 + Shipping}
                </p>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => {
                    dispatch(resetCart());
                    openModal2();
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Buy Now
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cnt.map((action, ind) => {
                return (
                  <div key={ind} className="bg-white p-4 rounded-lg shadow-md">
                    <img
                      src={action.thumbnail}
                      alt="Product 1"
                      className="h-32 object-cover mx-auto mb-4"
                    />
                    <h2 className="text-xl font-semibold">{action.title}</h2>
                    <p className="text-gray-600">${action.price}</p>
                    <div className="mt-4 flex justify-between  items-center">
                      <div className="flex items-center">
                        <button
                          className="bg-gray-200 w-8 h-8 me-2 rounded-full"
                          onClick={() => {
                            dispatch(decrement(ind));
                          }}
                        >
                          <BsDash className="m-auto  text-sm" />
                        </button>
                        {action.iteam}
                        <button
                          className="bg-gray-200 w-8 h-8 ms-2 rounded-full"
                          onClick={() => {
                            dispatch(increment(ind));
                          }}
                        >
                          <BsPlusLg className="m-auto text-sm" />
                        </button>
                      </div>
                      <div className="text-blue-600 font-medium">
                        Total:
                        <span className="text-black ms-1 font-normal">
                          ${action.total}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          dispatch(removeFromCart(ind));
                          openModal();
                        }}
                        className="px-4 py-2 hover:text-red-600 hover:bg-white duration-300 border border-red-600 text-white bg-red-600 rounded-md"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {!loader2 && (
        <div>
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className={`modal active`}>
          <div className="modal-content">
            <div className=" bg-yellow-200 text-yellow-800 border-b-4 border-yellow-600 p-4  ">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 flex items-center text-yellow-600">
                    <CgDanger className="h-10 w-10" />
                  </div>
                  <div className="ms-3">
                    <p className="font-bold">Warning</p>
                    <p>Iteam Delete Successfully.</p>
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

      {isModalOpen2 && (
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
                    <p>Order Place  Successfully.</p>
                  </div>
                </div>
                <button
                  onClick={closeModal2}
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
};

export default Cart;
