import "./index.scss";
import React from "react";
import { useSelector } from "react-redux";

import CustomerSignUpBackground from "assets/images/CustomerSignUpBackground.png";

import { Logo } from "components/Logo";
import { Modal } from "components/Modal";
import ForgetPasswordScene from "containers/Business/Auth/ForgotPassword";

import { RootState } from "types";

const modalStyle = {
  padding: 0,
  marginTop: "140px",
  border: "none",
  width: "753px",
  height: "500px",
};

export const ForgetPasswordDialog = ({ isOpen, onClose }) => {
  const { error, loading } = useSelector((state) => state.resetPass);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      error={error}
      loading={loading}
      hasTitle={false}
      hasFooter={false}
      contentStyle={modalStyle}
      isForCustomerAuth
    >
      <div className="base_auth_page">
        <div
          className="base_auth_content"
          style={{ backgroundImage: `url(${CustomerSignUpBackground})` }}
        >
          <div className="base_auth_content_view">
            <Logo />
          </div>
        </div>
        <div className="base_auth_form">
          <ForgetPasswordScene />
        </div>
      </div>
    </Modal>
  );
};
