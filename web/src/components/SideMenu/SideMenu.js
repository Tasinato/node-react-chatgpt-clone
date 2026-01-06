import React from "react";
import "./SideMenu.css";

export const SideMenu = ({ onNewChat }) => {
  return (
    <aside className="side-menu">
      <button className="side-menu-button" type="button" onClick={onNewChat}>
        <span>+</span>New Chat
      </button>
    </aside>
  );
};
