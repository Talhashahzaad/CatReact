import React from "react";

const ToggleButton = ({ onToggle }) => {
  return (
    <button onClick={onToggle} className="toggle-btn">
      Toggle Sidebar
    </button>
  );
};

export default ToggleButton;
