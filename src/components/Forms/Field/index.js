import "./index.scss";
import React from "react";

export const FormField = ({ label, children }) => {
  return (
    <div className="form_field">
      <div className="form_field_label">{label}</div>
      {children}
    </div>
  );
};
