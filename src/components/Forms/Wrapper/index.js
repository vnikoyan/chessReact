import "./index.scss";
import React from "react";

export const FormWrapper = ({ title, children }) => (
  <div className="form_wrapper">
    <div className="form_title">{title}</div>
    {children}
  </div>
);
