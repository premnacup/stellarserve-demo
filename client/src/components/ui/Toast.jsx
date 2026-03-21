import React, { useEffect } from "react";
import "./Toast.css";

const Toast = ({ message, onClose, duration = 3500 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="toast-container">
      <div className="toast">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Toast;
