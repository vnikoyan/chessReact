import "./index.scss";

import classnames from "classnames";
import React from "react";

export const FakeButton = ({ children, onClick, className }) => {
  const buttonClasses = classnames("fake_button", {
    [`${className}`]: className,
  });
  return (
    <div className={buttonClasses}>
      <button type="button" onClick={onClick}>
        {children}
      </button>
    </div>
  );
};
