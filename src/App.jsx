import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Layout from "./Pages/Layout.jsx";
import Login from "./Components/Login";
import { useSelector, useDispatch } from "react-redux";
import Settings from "./Components/Settings.jsx";
import NotFound from "./Components/NotFound.jsx";
import { toast } from "react-toastify";
import { fetchUsers, setLoggedInUser } from "./store/user-slice";
import Pomodoro from "./Components/Pomodoro/Pomodoro.jsx";
import InfoModal from "./Components/About.jsx";
const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.user.loggedInUser);

  useEffect(() => {
    if (auth) {
      dispatch(fetchUsers());
    }
  }, [auth, dispatch]);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/v1/check-auth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        alert("Session expired. Please login again.");
        toast.success("Successfully logged out");
        return window.location.replace("/login");
      }

      // Handle other non-OK responses

      if (!res.ok) {
        const data = await res.json();
        if (data.isTokenExpired) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          dispatch(setLoggedInUser(null));
          toast.info("Token expired, please login again");
          return window.location.replace("/login");
        }
      }
    } catch (error) {
      console.error("Auth Check Error:", error);
      return false;
    }
  };

  //This will check the user is authenticated or not and only run after user logged in.
  useEffect(() => {
    if (auth) {
      checkAuth();
    }
  }, [auth]);
  return (
    <>
      <BrowserRouter>
        <div className="flex">
          <div className="flex-grow">
            {/* Your existing content */}

            <Routes>
              <Route path="login" element={auth ? <Layout /> : <Login />} />
              <Route path="signup" element={auth ? <Layout /> : <Signup />} />
              <Route path="/" element={auth ? <Layout /> : <Login />}>
                <Route index element={<Pomodoro />} />
                <Route
                  path="about"
                  element={auth ? <InfoModal /> : <Login />}
                />
                <Route
                  path="settings"
                  element={auth ? <Settings /> : <Login />}
                />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
