import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../store/userSlice";

export const ImageGen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="flex h-screen">
      <div
        className="bg-black text-white flex flex-col justify-between items-center"
        style={{ width: "20vw" }}
      >
        <div className="flex flex-col">
          <Link
            to={"/home"}
            className="text-lg text-center py-2 bg-gray-700 px-10 mt-4"
          >
            Chat Bot
          </Link>
          <Link
            to={"/imgGenrator"}
            className="text-lg py-2 text-center bg-gray-700 px-10 mt-4"
          >
            Image Generation
          </Link>
        </div>
        <button
          className="text-lg py-2 bg-gray-700  px-20 mb-4"
          onClick={() => {
            dispatch(addUser({ user: null, token: "" }), navigate("/"));
          }}
        >
          Logout
        </button>
      </div>
      <div
        className=" bg-gray-800 text-white justify-center items-center flex flex-col text-5xl font-medium"
        style={{ width: "80vw" }}
      >
        Coming Soon...
      </div>
    </div>
  );
};
