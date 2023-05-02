import RcCheckbox from "rc-checkbox";
import React from "react";

import styles from "./index.module.scss";

export const Checkbox = ({ name, label, defaultChecked, onChange }) => {
  return (
    <div className={styles.checkbox}>
      <RcCheckbox
        name={name}
        className={styles.custom}
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
      <p className={styles.text}>{label}</p>
    </div>
  );
};
