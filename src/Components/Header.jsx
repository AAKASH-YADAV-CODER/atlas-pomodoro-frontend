import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInUser } from "../store/user-slice";
import { TypeAnimation } from "react-type-animation";
import { getApiUrl } from "../utils/apiConfig";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.user.loggedInUser);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(getApiUrl(`/api/v1/user/logout`), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      dispatch(setLoggedInUser(null));
      toast.success(data.message);
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Invalid logout response");
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(setLoggedInUser(JSON.parse(user)));
    }
  }, []);

  return (
    <nav className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white fixed top-0 z-40 w-full shadow-lg">
      <div className="container mx-auto px-4 py-3 backdrop-blur-sm bg-opacity-90">
        {/* Desktop Navigation */}
        <div className="flex justify-between items-center">
          {/* Branding */}
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold ml-2 pt-2 italic">
              {auth && (
                <TypeAnimation
                  sequence={["HI " + auth.name.toUpperCase(), 1000, "", 500]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  cursor={true}
                />
              )}
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
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

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 hover:bg-purple-700 rounded-lg transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-violet-400" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="pt-4 pb-3 space-y-3">
            {auth ? (
              <button
                onClick={handleLogout}
                className="block py-2 px-4 rounded hover:bg-purple-700 hover:text-violet-400 transition"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `block py-2 px-4 rounded ${
                    isActive
                      ? "text-violet-400 bg-purple-700"
                      : "hover:bg-purple-700 hover:text-violet-400 transition"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
