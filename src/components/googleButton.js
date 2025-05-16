import React from "react";

const GoogleButton = ({ children, ...buttonProps }) => {
  return (
    <button {...buttonProps}>
      <div className="google-icon-wrapper">
        <img
          className="google-icon"
          src="https://img.freepik.com/premium-vector/print-creative-modern-color-full-logo-design_1271730-562.jpg?semt=ais_hybrid&w=740"
          alt="google button"
          style={{ width: '30px', height: '30px' }} // adjust as needed
        />
        <p className="btn-text">
          <b>{children}</b>
        </p>
      </div>
    </button>
  );
};

export default GoogleButton;
