import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import send from "../Components/send.png";
import { toast } from "react-toastify";
import axios from "axios";

export const ChatPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState();
  const [chat, setChat] = useState([
    {
      userMsg: "",
      assistantMsg: "",
    },
  ]);

  useEffect(() => {
    let chats = localStorage.getItem("chats");
    console.log(chats);
    if (chats) {
      chats = JSON.parse(chats);
      setChat((...prev) => [...prev, ...chats]);
    }
  }, []);

  const getAnswer = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/chat", {
        message,
      });
      setChat((prev) => [...prev, { assistantMsg: res.data.assistantMsg }]);
      if (!res.data.success) {
        toast.warning(res.data.message);
      }
      localStorage.setItem(
        "chats",
        JSON.stringify([
          ...chat,
          { userMsg: message, assistantMsg: res.data.assistantMsg },
        ])
      );
      setMessage("");
    } catch (error) {
      toast.warning("internal server error");
    }
  };

  return (
    <div className="flex h-screen">
      <div
        className="bg-black text-white flex flex-col justify-between items-center"
        style={{ width: "20vw" }}
      >
        <div className="flex flex-col">
          <button
            className="text-lg py-2 bg-gray-700 px-20 mt-4"
            onClick={() => {
              localStorage.setItem(
                "chats",
                JSON.stringify([{ userMsg: "", assistantMsg: "" }])
              );
              setChat([
                {
                  userMsg: "",
                  assistantMsg: "",
                },
              ]);
            }}
          >
            New Chat
          </button>

          <Link
            to={"/home/imgGenrator"}
            className="text-lg py-2 bg-gray-700 px-10 mt-4"
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
        className=" bg-gray-800 text-white flex flex-col"
        style={{ width: "80vw" }}
      >
        <div className="relative " style={{ height: "93vh" }}>
          <div
            id="msgContainer"
            className="message-container flex flex-col gap-3 p-2 absolute bottom-0 w-full overflow-y-scroll"
            style={{ height: "100%" }}
          >
            {chat?.map((chat, index) => (
              <>
                {chat.userMsg && (
                  <div
                    className="user-msg flex flex-col gap-1 self-end p-2 break-words"
                    style={{ maxWidth: "700px" }}
                  >
                    <p className="self-end font-black">You</p>
                    <p className=" bg-gray-700 p-4 leading-relaxed text-lg rounded-xl">
                      {chat.userMsg}
                    </p>
                  </div>
                )}

                {chat.assistantMsg && (
                  <div
                    className="assi-msg flex flex-col gap-1 self-start p-2 break-words"
                    style={{ maxWidth: "700px" }}
                  >
                    <p className="self-start font-black">AI Assitant</p>
                    <p className=" bg-gray-700 p-4 leading-relaxed text-lg rounded-xl">
                      {chat.assistantMsg}
                    </p>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>

        <div
          className="message-input flex items-center gap-4 w-full p-2"
          style={{ height: "7vh" }}
        >
          <input
            className="w-full h-8 p-5 bg-gray-700 text-white outline-none"
            value={message}
            placeholder="Ask Anything ...."
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button
            className=" py-2 px-4 bg-gray-700 flex justify-center items-center"
            onClick={() => {
              setChat((prev) => [...prev, { userMsg: message }]);
              getAnswer();
            }}
          >
            <img src={send} alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
};
