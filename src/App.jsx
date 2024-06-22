import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth.js"; // Import the authServices module
import { useState } from "react"; // Import the useState hook
import { login,  logout } from "./store/authSlice.js";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true); // Create a loading state
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <>
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
        <div className="w-full block">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  ) : null;
}

export default App;
