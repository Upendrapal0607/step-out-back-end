import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GetContextValue } from "../ContextProvider/TrainContext";
import { useToast } from "@chakra-ui/react";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuth, setIsAuth, loginType, userDetails } = GetContextValue();
  const toast = useToast();
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const handleLogOut = () => {
    localStorage.removeItem("trailtoken");
    
    toast({
      title: 'Log Out',
      description: "Log Out success!",
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    setIsAuth(false);
    navigate("/");
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-10xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="w-full flex justify-between">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-white font-semibold text-lg">
                STEP OUT
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to={loginType == "user" ? "/dashboard" : "/admindashboard"}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  DASHBOARED
                </Link>

                {isAuth ? (
                  <div>
                    <button
                      onClick={handleLogOut}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      LOGOUT
                    </button>
                    <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      {userDetails?.username}
                    </button>
                  </div>
                ) : (
                  <div>
                    <Link
                      to="/register"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      NEW USER
                    </Link>

                    <Link
                      to="/login"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      LOGIN
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleNavbar}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${isOpen ? "block" : "hidden"} md:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to={loginType == "user" ? "/dashboard" : "/admindashboard"}
            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            DASHBOARED
          </Link>
          {isAuth ? (
            <div>
              <button
                onClick={handleLogOut}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                LOGOUT
              </button>
              <button
                onClick={handleLogOut}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                {userDetails?.username}
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/register"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                NEW USER
              </Link>

              <Link
                to="/login"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                LOGIN
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
