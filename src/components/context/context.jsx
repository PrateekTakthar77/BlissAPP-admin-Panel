import React, { createContext, useContext, useEffect, useState } from "react";
import { Router, useNavigate } from "react-router-dom";

const AdminContext = createContext();
const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
const API_LOCAL_URL = import.meta.env.VITE_APP_API_LOCAL_URL;
console.log("API_BASE_URL:", API_BASE_URL, API_LOCAL_URL);
const AdminProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: "TestTest@example.com",
    mobile: "123456789",
    name: "TestUser",
    _id: "TestID",
  });
  const [token, setToken] = useState("TestToken");
  const navigateTo = useNavigate();
  const [loadingState, setLoadingState] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [UserAgain, setUserAgain] = useState(false);

  useEffect(() => {
    // Redirect to auth page if user is not logged in
    if (!user) {
      navigateTo("/auth");
    }
  }, [user, token]);

  useEffect(() => {
    console.log("AdminProvider: fetchAgain:", fetchAgain);
    // Set initial user and token from local storage
    setToken((prev) => {
      const token = JSON.parse(localStorage.getItem("token"));
      return token ? token : "TestToken";
    });
    setUser((prev) => {
      const user = JSON.parse(localStorage.getItem("User"));
      return user
        ? user
        : {
            email: "TestTest@example.com",
            mobile: "123456789",
            name: "TestUser",
            _id: "TestID",
          };
    });
  }, [fetchAgain, UserAgain]);

  return (
    <AdminContext.Provider
      value={{
        loadingState,
        setLoadingState,
        user,
        setUser,
        token,
        setToken,
        setFetchAgain,
        fetchAgain,
        setUserAgain,
        API_BASE_URL,
        API_LOCAL_URL,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const AdminState = () => {
  return useContext(AdminContext);
};

export default AdminProvider;
