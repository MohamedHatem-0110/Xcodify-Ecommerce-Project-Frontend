import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions";
import CartIcon from "./CartIcon";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [searchWord, setSearchWord] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const menuRef = useRef(null); // Ref for the menu element

  const { user } = useSelector((state) => state.user);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    if (user === null) {
      // Perform additional actions when user is null
      console.log("User is null");
    }
    // console.log(user);

    // Add event listener to detect clicks outside of the menu
    document.addEventListener("click", handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [user]); // Trigger effect when user state changes

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      // Click occurred outside of the menu, so hide the menu

      setIsMenuOpen(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchWord && navigate("/products/search/" + searchWord);
  };

  return (
    <>
      <nav className="bg-gray-800 py-2 px-2 sm:px-10 w-full z-10 fixed top-0">
        <div className="flex justify-between items-center gap-3 sm:gap-10">
          {/* Logo */}
          <div
            className="text-white text-3xl font-bold logo italic cursor-pointer"
            onClick={() => navigate("/")}
          >
            XSHOP
          </div>

          {/* Search bar */}
          <form
            className="flex justify-center w-full"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-700 text-white px-4 py-2 rounded-l-lg focus:outline-none w-full"
              onChange={(e) => setSearchWord(e.target.value)}
            />
            <button className="bg-gray-700 text-white px-4 py-2 rounded-lg rounded-l-none transition ease-in-out hover:bg-white hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
                
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </form>

          {/* User and Cart icons */}
          <div className="flex items-center space-x-4 text-white">
            <div className="relative flex items-center">
              <button
                className="text-white focus:outline-none flex"
                onClick={handleMenuToggle}
                ref={menuRef}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                {user !== null && (
                  <div className="w-full whitespace-nowrap hidden sm:block">
                    Hi, {user.firstName}
                  </div>
                )}
              </button>

              {/* User menu */}
              {isMenuOpen && user === null && (
                <div className="absolute top-10 -left-10 bg-gray-800 text-white rounded-md shadow-lg flex-col z-10">
                  <button
                    className="block w-full py-2 px-4 text-center hover:bg-gray-700 rounded-md"
                    onClick={() => {
                      navigate("/login");
                      setIsMenuOpen(false);
                    }}
                  >
                    Login
                  </button>
                  <button
                    className="block w-full py-2 px-4 text-center hover:bg-gray-700 rounded-md"
                    onClick={() => {
                      navigate("/register");
                      setIsMenuOpen(false);
                    }}
                  >
                    Register
                  </button>
                </div>
              )}

              {isMenuOpen && user !== null && (
                <div className="absolute top-10 -left-10 bg-gray-800 text-white rounded-md shadow-lg flex-col">
                  <button
                    className="block w-full py-2 px-4 text-center hover:bg-gray-700 rounded-md"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/orders");
                    }}
                  >
                    View Orders
                  </button>
                  <button
                    className="block w-full py-2 px-4 text-center hover:bg-gray-700 rounded-md"
                    onClick={() => {
                      setIsMenuOpen(false);
                      dispatch(logout());
                      navigate("/");
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            <div className="cursor-pointer" onClick={() => navigate("/cart")}>
              <CartIcon />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
