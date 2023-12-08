import "./App.css";
import React, { useEffect, useState } from "react";
import { FaBell, FaCartShopping, FaList } from "react-icons/fa6";
import { Routes, Route, Link } from "react-router-dom";
import Shope from "./Shop";
import ProductDetails from "./Product-Details";
import Cart from "./cart";
import { useSelector } from "react-redux";

function App() {

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cnt = useSelector((state) => state.counter.no);
  const cntLength = cnt.length;

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="App">
      <header className="App-header sticky top-0 z-10">
        {/* The enclosing empty tags <> and </> are used to group multiple elements without adding an extra div to the DOM. */}
        <div className="min-h-full">
          {/* The navigation bar */}
          <nav className="bg-gray-800">
            {/* Container for navigation bar content */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {/* Flex container for navigation bar items */}
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="YourCompany"
                    />
                  </div>

                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      <Link
                        to={""}
                        className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        Shop
                      </Link>
                      <Link className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                        Team
                      </Link>
                      <Link className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                        Product
                      </Link>
                      <Link className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                        Reports
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Right side of the navigation bar */}
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="relative flex flex-row rounded-full bg-gray-800 p-1 text-gray-400 "
                      onClick={toggleDropdown}
                    >
                      {/* Bell icon */}
                      <Link to={"/cart"} className="relative">
                        <FaCartShopping className="hover:text-white m-1 me-3" />
                        {cntLength > 0 && (
                          <span className="absolute top-0 right-1 text-xs bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center">
                            {cntLength}
                          </span>
                        )}
                      </Link>
                      <FaBell className="hover:text-white m-1"></FaBell>
                    </button>

                    {/* User profile dropdown */}
                    <div className="relative ml-3 ms-5">
                      <div>
                        <button
                          type="button"
                          className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          id="user-menu-button"
                          aria-expanded="false"
                          aria-haspopup="true"
                        >
                          <span className="absolute -inset-1.5"></span>
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile menu button */}
                <div className="me-2 flex md:hidden">
                  <button
                    type="button"
                    className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    aria-controls="mobile-menu"
                    aria-expanded={isMobileMenuOpen}
                    onClick={toggleMobileMenu}
                  >
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Open main menu</span>
                    {/* Hamburger icon */}
                    <FaList className="m-0.5"></FaList>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile menu, shown/hidden based on screen size */}
            <div
              className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
              id="mobile-menu"
            >
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {/* Mobile navigation links */}
                <Link
                  to={""}
                  className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Shop
                </Link>
                <Link className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                  Team
                </Link>
                <Link className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                  Product
                </Link>
                <Link className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                  Reports
                </Link>
              </div>

              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center justify-between px-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {/* User profile image in mobile view */}
                      <img
                        className="h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>

                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        Tom Cook
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        tom@example.com
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="relative flex flex-row rounded-full bg-gray-800 p-1 text-gray-400 "
                    onClick={toggleDropdown}
                  >
                    {/* Bell icon */}
                    <Link to={"/cart"}>
                      <FaCartShopping className="hover:text-white m-1 me-3" />
                    </Link>
                    <FaBell className="hover:text-white m-1"></FaBell>
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <div>
        <Routes>
          {/* <Route path="/" element={<ProductDetails />} /> */}
          <Route path="/" element={<Shope />} />
          <Route path="/products/:abc" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
