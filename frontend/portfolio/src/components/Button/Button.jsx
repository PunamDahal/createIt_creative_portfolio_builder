import React from "react";
import styles from "./Button.module.css";

const Button = ({ text, width, height, color, onClick }) => {
  return (
    <button
      className={styles.customButton}
      style={{
        width: width || "100%",
        height: height || "50px",
        backgroundColor: color || "#333",
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;