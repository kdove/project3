import React, { useState, useCallback, Fragment } from "react";
import PropTypes from "prop-types";
import Register from "./Register";
import { Link, Redirect } from 'react-router-dom';
import TermsOfService from "./TermsOfService";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import ForgotPassword from "./ForgotPassword";
import NotFound from "./NotFound";
import ModalBackdrop from "../../../Shared/Components/ModalBackdrop";

function DialogSelector(props) {
  const {
    dialogOpen,
    openTerms,
    openRegister,
    openLogin,
    openResetPassword,
    onClose,
  } = props;
  const [loginStatus, setLoginStatus] = useState(null);
  const [registerStatus, setRegisterStatus] = useState(null);

  const _onClose = useCallback(() => {
    setLoginStatus(null);
    setRegisterStatus(null);
    onClose();
  }, [onClose, setLoginStatus, setRegisterStatus]);

  const printDialog = useCallback(() => {
    switch (dialogOpen) {
      case "register":
        return (
          <Register
            onClose={_onClose}
            openTerms={openTerms}
            status={registerStatus}
            setStatus={setRegisterStatus}
          />
        );
      case "termsOfService":
        return <TermsOfService onClose={openRegister} />;
      case "login":
        return (
          <Login
            onClose={_onClose}
            status={loginStatus}
            setStatus={setLoginStatus}
            openResetPassword={openResetPassword}
          />
        );
      case "resetPassword":
        return (
          <ResetPassword
            setLoginStatus={setLoginStatus}
            onClose={openLogin}
          />
        );
      default:
    }
  }, [
    dialogOpen,
    openResetPassword,
    openLogin,
    openRegister,
    openTerms,
    _onClose,
    loginStatus,
    registerStatus,
    setLoginStatus,
    setRegisterStatus,
  ]);

  return (
    <Fragment>
      {dialogOpen && <ModalBackdrop open />}
      {printDialog()}
    </Fragment>
  );
}

DialogSelector.propTypes = {
  dialogOpen: PropTypes.string,
  openLogin: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  openTerms: PropTypes.func.isRequired,
  openRegister: PropTypes.func.isRequired,
  openResetPassword: PropTypes.func.isRequired,
};

export default DialogSelector;
