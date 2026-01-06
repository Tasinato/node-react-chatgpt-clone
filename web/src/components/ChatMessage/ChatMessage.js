import React from "react";
import "./ChatMessage.css";
import Avatar from "../../assets/avatar";

export const ChatMessage = ({ message }) => {
  const isGPT = message.user === "gpt";

  return (
    <div className={`chat-message ${isGPT ? "ChatGPT" : ""}`}>
      <div className="chat-message-center">
        <div className={`avatar ${isGPT ? "ChatGPT" : ""}`}>
          {isGPT && <Avatar />}
        </div>

        <div className="message">
          {String(message.message)
            .split("\n")
            .filter((line) => line.trim() !== "")
            .map((line, index) => (
              <p key={index}>{line}</p>
            ))}
        </div>
      </div>
    </div>
  );
};
