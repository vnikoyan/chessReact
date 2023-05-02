import "./index.scss";
import classnames from "classnames";
import React from "react";

export const BlackButton = ({
  disabled,
  className,
  onClick,
  children,
  invert,
}) => {
  const buttonClasses = classnames("blackButton", {
    [`${className}`]: className,
  });
  return (
    <div className={buttonClasses}>
      <button
        type="button"
        className={invert ? "inverted_accent_button" : ""}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};
