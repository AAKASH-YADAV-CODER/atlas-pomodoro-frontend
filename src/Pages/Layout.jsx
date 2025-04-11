import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const Layout = () => {
  const auth = useSelector((state) => state.user.loggedInUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out user");
    navigate("/login");
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About Pomodoro", path: "/about" },
    { label: "Settings", path: "/settings" },
  ];

  return (
    <>
      <Header />
      <div className="w-full min-h-screen top-24 place-items-center absolute px-10">
        <div className="flex items-center space-x-8 ">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "text-violet-400"
                  : "hover:text-violet-400 transition"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <main className="top-14 py-10">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
