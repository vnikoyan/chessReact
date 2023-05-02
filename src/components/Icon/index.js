import classnames from "classnames";
import React from "react";

import arrowIcon from "assets/images/arrow.svg";

import emailIcon from "assets/images/email.svg";
import linkIcon from "assets/images/link.svg";
import locationIcon from "assets/images/location.svg";
import phoneIcon from "assets/images/phone.svg";

const getIcon = (type) => {
  switch (type) {
    case "arrow":
      return arrowIcon;
    case "location":
      return locationIcon;
    case "link":
      return linkIcon;
    case "phone":
      return phoneIcon;
    case "email":
      return emailIcon;

    default:
      return arrowIcon;
  }
};

export const Icon = ({ className, type = "arrow" }) => {
  const iconSource = getIcon(type);

  const iconClasses = classnames("icon", { [`${className}`]: className });

  return <img className={iconClasses} src={iconSource} alt="" />;
};
