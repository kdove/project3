import React, { useState, useCallback } from "react";
import authSvg from '../../assests/forget.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import PropTypes from "prop-types";
import {
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  withStyles,
} from "@material-ui/core";
import ButtonCircularProgress from "../../../Shared/Components/ButtonCircularProgress";

const styles = (theme) => ({
  dialogContent: {
    paddingTop: theme.spacing(2),
  },
  dialogActions: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
});

function ForgotPassword(props) {
  const { onClose, classes, setLoginStatus } = props;
  const [isLoading, setIsLoading] = useState(false);

  const sendPasswordEmail = useCallback(() => {
    setIsLoading(true);

    setTimeout(() => {
      setLoginStatus("verificationEmailSend");
      setIsLoading(false);
      onClose();
    }, 1500);
  }, [setIsLoading, setLoginStatus, onClose]);

  return (
    <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
    <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
      <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
        <div className='mt-12 flex flex-col items-center'>
    <Dialog
      open
      hideBackdrop
      onClose={onClose}
      disableBackdropClick={isLoading}
      disableEscapeKeyDown={isLoading}
      maxWidth="xs"
    >
      <ToastContainer />
      <div className='w-full flex-1 mt-8 text-indigo-500'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendPasswordEmail();
        }}
      >
        <DialogContent className={classes.dialogContent}>
          <Typography paragraph>
            Enter your email address below and we will send you instructions on
            how to reset your password.
          </Typography>
          <TextField
          className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
            variant="outlined"
            margin="dense"
            required
            fullWidth
            label="Email Address"
            autoFocus
            type="email"
            autoComplete="off"
            placeholder='Email'
          />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
           className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
            type="submit"
            variant="contained"
            color="secondary"
            disabled={isLoading}
          >
            <i className='fas fa-sign-in-alt  w-6  -ml-2' />
            <span className='ml-3'>Reset password</span>
            {isLoading && <ButtonCircularProgress />}
          </Button>
        </DialogActions>
      </form>
      </div>
      <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
          <div
            className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${authSvg})` }}
          ></div>
        </div>
    </Dialog>
    </div>
        </div>
      </div>
      
    </div>
  );
}

ForgotPassword.propTypes = {
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  setLoginStatus: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(ForgotPassword);

