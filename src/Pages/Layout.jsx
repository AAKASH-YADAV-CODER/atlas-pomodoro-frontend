import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
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

  return (
    <>
      <Header />
      <div className="flex flex-row min-h-screen">
        <div className="flex-1 flex flex-col">
          <main className="flex-1 relative p-4 lg:ml-64 top-14">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
