import "./index.scss";
import classnames from "classnames";
import React from "react";

import { Button } from "@material-ui/core";

export const LimeButton = ({
  loading,
  disabled,
  className,
  onClick,
  children,
  invert,
}) => {
  const buttonClasses = classnames("limeButton", {
    [`${className}`]: className,
  });
  return (
    <div className={buttonClasses}>
      <Button
        onClick={onClick}
        color="primary"
        fullWidth
        disabled={disabled}
        size="large"
        type="submit"
        variant="contained"
      >
        {children}
      </Button>
    </div>
  );
};
