import "./App.css";
import React, { useEffect, useState } from "react";
import { FaMagnifyingGlass, FaRegBell, FaDollarSign } from "react-icons/fa6";
import axios from "axios";
import { Link } from "react-router-dom";

function Shope() {
  let [categories, setcategories] = useState([]);
  let [allproduct, setallproduct] = useState([]);
  let [loader, setloader] = useState(false);
  let [loader1, setloader1] = useState(false);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((rest) => {
        setcategories(rest.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const demo = (category = "") => {
    let url = "https://dummyjson.com/products";
    // if (category) {
    //   url = `https://dummyjson.com/products/category/${category}`;
    // }

    axios
      .get(url)
      .then((allproduct) => {
        setallproduct(allproduct.data.products);
        setloader(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    demo();
  }, []);

  let iteamCat = (iteam) => {
    axios
      .get(`https://dummyjson.com/products/category/${iteam}`)
      .then((producta) => {
        setallproduct(producta.data.products);
        setloader1(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (searchInput !== "") {
      axios
        .get(`https://dummyjson.com/products/search?q=${searchInput}`)
        .then((productaS) => {
          setallproduct(productaS.data.products);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchInput]);

  return (
    <div>
      {loader && (
        <div className="m-2 flex">
          <div
            className="w-1/4 bg-blue rounded-lg px-5 overflow-auto sticky cat"
            style={{ height: `calc(100vh - 80px)`, top: "72px" }}
          >
            <div className="flex-shrink-0 flex align-middle mt-3">
              <img
                className="h-8 w-8 "
                src="https://tailwindui.com/img/logos/mark.svg?color=white"
                alt="YourCompany"
              />
              <span className="text-white font-semibold ms-3 pt-0.5">
                Name of Website
              </span>
            </div>

            <nav className="mt-6 mb-3">
              <ul>
                <li
                  onClick={demo}
                  className="py-2 px-4 font-semibold text-white rounded-md mb-1 cursor-pointer"
                  style={{ background: "#494E53" }}
                >
                  All
                </li>

                {categories.map((categories_value, id) => {
                  return (
                    <li
                      key={id}
                      onClick={(c) => {
                        iteamCat(categories_value);
                      }}
                      className="py-2 px-4 font-semibold text-white rounded-md mb-1 categories-hover capitalize"
                    >
                      {categories_value}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
          <div className="w-3/4">
            <div
              className="border-y border-gray-300 px-8 flex justify-between align-middle z-10 bg-white content-center sticky"
              style={{ top: "72px" }}
            >
              <div className="relative my-2 rounded-md shadow-sm serch-call w-3/4 me-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                  <span className="text-gray-500 sm:text-sm">
                    <FaMagnifyingGlass className=" text-gray-6500 text-lg"></FaMagnifyingGlass>
                  </span>
                </div>

                <input
                  type="text"
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                  }}
                  name="price"
                  id="price"
                  value={searchInput}
                  className="block  rounded-md border-0 py-1.5 ps-14 w-full text-gray-900 placeholder:text-gray-500 sm:text-sm sm:leading-6"
                  placeholder="Search..."
                />
              </div>

              <div className="flex w-1/6">
                <div className="border-x border-gray-400 h-1/2 m-auto"></div>
                <img
                  className="h-8 w-8 rounded-full m-auto ms-5 "
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
            </div>

            <div
              className="py-6 px-6 overflow-auto pp"
              style={{ height: `calc(100vh - 134px)` }}
            >
              {loader || loader1 && allproduct.length  > 0 ? (
                <div className="border rounded-xl ">
                  <div>
                    <div className="px-3 lg:px-4 py-3 lg:py-4">
                      <div className=" grid  grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-4">
                        {allproduct.map((allimg) => {
                          return (
                            <div
                              key={allimg.id}
                              className=" group relative border bg-gray-100 border-gray-300 p-2 rounded-lg shadow-lg  hover:scale-105 transition-transform duration-500"
                            >
                              <div className=" w-full pb-2 border-b  border-b-gray-400 h-52 group-hover:scale-105 transition-transform duration-500">
                                <img
                                  src={allimg.thumbnail}
                                  alt="img"
                                  className="h-full w-full rounded lg:h-full lg:w-full"
                                />
                              </div>
                              <Link
                                to={`/products/${allimg.id}`}
                                className="stretched-link"
                              ></Link>
                              <div className="m-3 flex flex-col justify-between">
                                <div>
                                  <h3 className="text-black truncate">
                                    <span className="font-semibold me-1">
                                      Name:
                                    </span>
                                    {allimg.title}
                                  </h3>

                                  <h4 className=" mt-1 text-indigo-800 flex font-semibold">
                                    <span className="me-1 ">Price:</span>
                                    <FaDollarSign className="mt-1" />
                                    {allimg.price}
                                  </h4>

                                  <p className="mt-1 text-sm text-gray-500">
                                    <span className="me-1 font-semibold">
                                      Brand:
                                    </span>
                                    {allimg.brand}
                                  </p>

                                  <p className="mt-1 text-sm text-gray-500">
                                    <span className="me-1 font-semibold">
                                      Category:
                                    </span>
                                    {allimg.category}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : loader || loader && allproduct.length === 0 ? (
                <div className="border rounded-xl ">
                  <div>
                    <div className="px-3 lg:px-4 py-3 lg:py-4">
                      <div className=" grid  grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-4">
                        {allproduct.map((allimg) => {
                          return (
                            <div
                              key={allimg.id}
                              className=" group relative border bg-gray-100 border-gray-300 p-2 rounded-lg shadow-lg  hover:scale-105 transition-transform duration-500"
                            >
                              <div className=" w-full pb-2 border-b  border-b-gray-400 h-52 group-hover:scale-105 transition-transform duration-500">
                                <img
                                  src={allimg.thumbnail}
                                  alt="img"
                                  className="h-full w-full rounded lg:h-full lg:w-full"
                                />
                              </div>
                              <Link
                                to={`/products/${allimg.id}`}
                                className="stretched-link"
                              ></Link>
                              <div className="m-3 flex flex-col justify-between">
                                <div>
                                  <h3 className="text-black truncate">
                                    <span className="font-semibold me-1">
                                      Name:
                                    </span>
                                    {allimg.title}
                                  </h3>

                                  <h4 className=" mt-1 text-indigo-800 flex font-semibold">
                                    <span className="me-1 ">Price:</span>
                                    <FaDollarSign className="mt-1" />
                                    {allimg.price}
                                  </h4>

                                  <p className="mt-1 text-sm text-gray-500">
                                    <span className="me-1 font-semibold">
                                      Brand:
                                    </span>
                                    {allimg.brand}
                                  </p>

                                  <p className="mt-1 text-sm text-gray-500">
                                    <span className="me-1 font-semibold">
                                      Category:
                                    </span>
                                    {allimg.category}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="loader-container">
                  <div className="loader"></div>
                </div>
              )}
              {/* {loader1 || loader && (
                  <div className="border rounded-xl ">
                    <div>
                      <div className="px-3 lg:px-4 py-3 lg:py-4">
                        <div className=" grid  grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-4">
                          {allproduct.map((allimg) => {
                            return (
                              <div
                                key={allimg.id}
                                className=" group relative border bg-gray-100 border-gray-300 p-2 rounded-lg shadow-lg  hover:scale-105 transition-transform duration-500"
                              >
                                <div className=" w-full pb-2 border-b  border-b-gray-400 h-52 group-hover:scale-105 transition-transform duration-500">
                                  <img
                                    src={allimg.thumbnail}
                                    alt="img"
                                    className="h-full w-full rounded lg:h-full lg:w-full"
                                  />
                                </div>
                                <Link
                                  to={`/products/${allimg.id}`}
                                  className="stretched-link"
                                ></Link>
                                <div className="m-3 flex flex-col justify-between">
                                  <div>
                                    <h3 className="text-black truncate">
                                      <span className="font-semibold me-1">
                                        Name:
                                      </span>
                                      {allimg.title}
                                    </h3>

                                    <h4 className=" mt-1 text-indigo-800 flex font-semibold">
                                      <span className="me-1 ">Price:</span>
                                      <FaDollarSign className="mt-1" />
                                      {allimg.price}
                                    </h4>

                                    <p className="mt-1 text-sm text-gray-500">
                                      <span className="me-1 font-semibold">
                                        Brand:
                                      </span>
                                      {allimg.brand}
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                      <span className="me-1 font-semibold">
                                        Category:
                                      </span>
                                      {allimg.category}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {!loader1 || !loader && (
                  <div>
                    <div className="loader-container">
                      <div className="loader"></div>
                    </div>
                  </div>
                )} */}
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
    </div>
  );
}

export default Shope;
