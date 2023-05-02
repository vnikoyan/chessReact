import "./index.scss";
import classnames from "classnames";
import React from "react";

export const AccentButton = ({
  loading,
  disabled,
  className,
  onClick,
  children,
  invert,
  type,
}) => {
  const buttonClasses = classnames("accent_button_wrapper", {
    [`${className}`]: className,
  });
  const onClickWithoutPropagation = (event) => {
    if (onClick) {
      event.stopPropagation();
      onClick();
    }
  };
  return (
    <div className={buttonClasses}>
      <button
        type={type || "button"}
        className={invert ? "inverted_accent_button" : ""}
        disabled={disabled}
        onClick={onClickWithoutPropagation}
      >
        {children}
      </button>
    </div>
  );
};
