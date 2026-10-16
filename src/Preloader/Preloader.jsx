import React from "react";
import "./Preloader.css";

const Preloader = () => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 20,
        backgroundColor: "#fff",
        zIndex: 9999,
      }}
    >
      <div className="preloader-content">
        <h1>Searching for news...</h1>
        <span className="circle-preloader"></span>
      </div>
    </div>
  );
};

export default Preloader;
