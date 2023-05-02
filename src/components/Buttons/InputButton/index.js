import "./index.scss";
import classnames from "classnames";
import React, { useRef } from "react";

export const InputButton = ({
  text = "Choose file",
  inputRef,
  className,
  disabled,
  onSelect,
}) => {
  const elRef = useRef(null);

  const openFilePicker = () => {
    if (elRef.current) {
      elRef.current.click();
    }
  };

  const handleFileSelect = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      if (onSelect) {
        onSelect(file);
      }
    }
  };

  const buttonClasses = classnames("input_button", {
    [`${className}`]: className,
  });
  return (
    <div className={buttonClasses}>
      <button disabled={disabled} type="button" onClick={openFilePicker}>
        {text}
        <input
          ref={(el) => {
            elRef.current = el;
            if (typeof inputRef === "function") {
              inputRef(el);
            }
          }}
          type="file"
          onChange={handleFileSelect}
          accept="image/*"
        />
      </button>
    </div>
  );
};
