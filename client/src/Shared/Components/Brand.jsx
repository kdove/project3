import React from "react";

const Brand = ({ children }) => {
  return (
    <div className="flex items-center justify-between brand-area">
      <div className="flex items-center brand">
        <img src="/assets/images/Logo/logo-flower-transparent.png" alt="company-icon" />
        <span className="brand__text">
            <img src="/assets/images/Logo/circa-logo-text-transparent.png" alt="company-logo" />
            </span>
      </div>
      {children}
    </div>
  );
};

export default Brand;