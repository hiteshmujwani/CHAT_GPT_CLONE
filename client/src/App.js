import "./App.css";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./Pages/LandingPage";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { ChatPage } from "./Pages/ChatPage";
import { Private } from "./Components/Private";
import { Provider } from "react-redux";
import { store } from "./store/Store";
import { ImageGen } from "./Pages/ImageGen";

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Private />}>
            <Route path="" element={<ChatPage />} />
            <Route path="/home/imgGenrator" element={<ImageGen />} />
          </Route>
        </Routes>
      </Provider>
      <ToastContainer />
    </BrowserRouter>
  );
};
