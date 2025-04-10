import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Bell } from "lucide-react";
import Notification from "./Notification/Notification.jsx";
import { io } from "socket.io-client";
import { NavLink, useNavigate } from "react-router-dom";

const Layout = () => {
  const auth = useSelector((state) => state.user.loggedInUser);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
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

  // Listen for task notifications
  useEffect(() => {
    if (!socket) return;

    const handleTaskNotification = (data) => {
      setUnreadCount((prev) => prev + 1);
      const audio = new Audio("/notification.mp3");
      audio
        .play()
        .catch((error) =>
          console.error("Failed to play notification sound:", error)
        );
    };

    socket.on("task-ending-soon", handleTaskNotification);

    return () => {
      socket.off("task-ending-soon", handleTaskNotification);
    };
  }, [socket]);

  // Calculate remaining time function

  return (
    <>
      <Header />
      <div className="absolute inset-0 flex items-center justify-end pr-4">
        <button
          onClick={() => {
            setShowNotifications(!showNotifications);
            if (!showNotifications) {
              setUnreadCount(0);
            }
          }}
          className="relative p-1 hover:bg-gray-300 rounded-full duration-300"
        >
          <Bell className="h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Notification Popup */}
      {showNotifications && (
        <Notification
          onClose={() => setShowNotifications(false)}
          unreadCount={unreadCount}
          setUnreadCount={setUnreadCount}
        />
      )}

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
