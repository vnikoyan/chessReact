import "./index.scss";
import classnames from "classnames";
import React from "react";

import { Button } from "@material-ui/core";

export const GreyButton = ({
  loading,
  disabled,
  className,
  onClick,
  children,
  invert,
}) => {
  const buttonClasses = classnames("greyButton", {
    [`${className}`]: className,
  });
  return (
    <div className={buttonClasses}>
      <Button
        onClick={onClick}
        color="secondary"
        fullWidth
        size="large"
        type="submit"
        variant="contained"
      >
        {children}
      </Button>
    </div>
  );
};
