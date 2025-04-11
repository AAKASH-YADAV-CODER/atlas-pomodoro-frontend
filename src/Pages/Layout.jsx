import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { NavLink, useNavigate } from "react-router-dom";

const Layout = () => {
  const auth = useSelector((state) => state.user.loggedInUser);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // const newSocket = io();
    const newSocket = io("http://localhost:2000");
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  // Authenticate socket when user logs in
  useEffect(() => {
    if (socket && auth?._id) {
      socket.emit("authenticate", auth._id);
    }
  }, [socket, auth]);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About Pomodoro", path: "/about" },
    { label: "Setting", path: "/setting" },
  ];

  return (
    <>
      <Header />
      <div className="flex flex-row min-h-screen">
        <div className="flex-1 flex flex-col">
          <div className="flex items-center space-x-8">
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
            {auth ? (
              <button
                onClick={handleLogout}
                className="hover:text-violet-400 transition cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-violet-400"
                    : "hover:text-violet-400 transition"
                }
              >
                Login
              </NavLink>
            )}
          </div>
          <main className="flex-1 relative p-4 lg:ml-64 top-14">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
