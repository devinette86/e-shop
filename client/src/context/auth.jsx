import { createContext, useContext, useEffect, useState } from "react";
import axios from "../lib/axios-auth";
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(user);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }
    const getMe = async () => {
      try {
        const { data } = await axios.get("http://localhost:3102/user/me");

        setUser(data);
      } catch (err) {
        console.error("Error fetching user data:", err.message);
      }
    };

    getMe();
  }, []);

  const login = async (e) => {
    e.preventDefault();

    const body = {
      password: e.target.password.value,
      email: e.target.email.value,
    };
    try {
      const { data: token } = await axios.post(
        "http://localhost:3102/user/login",
        body
      );

      localStorage.setItem("token", token);
      console.log("Stored token:", token);

      window.location.replace("/");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const register = async (e) => {
    e.preventDefault();

    const body = {
      name: e.target.name.value,
      password: e.target.password.value,
      email: e.target.email.value,
    };

    try {
      await axios.post("http://localhost:3102/user/register", body);
      window.location.replace("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ login, register, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
