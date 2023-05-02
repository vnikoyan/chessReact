import "./index.scss";
import { useFormik } from "formik";
import React from "react";
import { useSelector } from "react-redux";

import CustomerSignUpBackground from "assets/images/CustomerSignUpBackground.png";

import { AccentButton } from "components/Buttons/AccentButton";
import { FormInput, FormWrapper } from "components/Forms";
import { ErrorMessage } from "components/Forms/ErrorMessage";
import { SuccessMessage } from "components/Forms/SuccessMessage";
import { Logo } from "components/Logo";
import { Modal } from "components/Modal";
import { customerSignUp } from "modules/signUp/actions";

import { RootState } from "types";

import { useAction } from "utils/hooks";
import { CustomerSignupFormValidation as validationSchema } from "utils/validation";

const modalStyle = {
  padding: 0,
  marginTop: "140px",
  border: "none",
  width: "753px",
  height: "500px",
};

export const SignUpDialog = ({ isOpen, onClose, openLoginDialog }) => {
  const createAccount = useAction(customerSignUp.request);
  const { email, password, name, error, loading, successMessage } = useSelector(
    (state) => state.signUp
  );

  const onSubmit = (values) => {
    createAccount({ requestData: values });
  };

  const {
    handleChange,
    handleBlur,
    resetForm,
    values,
    touched,
    errors,
    handleSubmit,
  } = useFormik({
    initialValues: { name, email, password },
    validationSchema,
    onSubmit,
  });

  const onCloseAndReset = () => {
    resetForm();
    onClose();
  };

  const onLoginDialogAndReset = () => {
    resetForm();
    openLoginDialog();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseAndReset}
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
          <FormWrapper title="Create account">
            <FormInput
              id="name"
              name="name"
              label="Name"
              placeholder="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              error={touched.name ? errors.name : undefined}
            />
            <FormInput
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="example@email.com"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={touched.email ? errors.email : undefined}
            />
            <FormInput
              withToggle
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={touched.password ? errors.password : undefined}
            />
            {error ? (
              <ErrorMessage error={error} />
            ) : (
              <SuccessMessage message={successMessage} />
            )}
            <AccentButton onClick={handleSubmit}>Create account</AccentButton>
            <div className="link_button_text">
              Already have an account?&nbsp;
              <span className="link_text" onClick={onLoginDialogAndReset}>
                Log in
              </span>
            </div>
          </FormWrapper>
        </div>
      </div>
    </Modal>
  );
};
