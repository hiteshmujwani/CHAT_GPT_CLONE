import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Login } from "../Pages/Login";

export const Private = () => {
  const { auth } = useSelector((auth) => auth);
  const [ok, setOK] = useState(false);
  useEffect(() => {
    axios.defaults.headers.common.Authorization = auth.token;
    const authCheck = async () => {
      const res = await axios.get("http://localhost:5000/api/v1/auth/home");
      if (!res.data.ok) {
        setOK(false);
      }
      setOK(true);
    };

    if (auth.token) {
      authCheck();
    }
  }, [auth.token]);
  return ok ? <Outlet /> : <Login />;
};
