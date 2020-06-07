import React, { Fragment, useEffect, lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import App from "./App";
import 'react-toastify/dist/ReactToastify.css';
import Login from './Logged_out/Components/Register_Login/Login.jsx';
import Register from './Logged_out/Components/Register_Login/Register.jsx';
import Activate from './Logged_out/Components/Register_Login/Activate.jsx';
import Private from './Logged_out/Components/Register_Login/Private.jsx';
import Admin from './Logged_out/Components/Register_Login/Admin.jsx';
import ForgetPassword from './Logged_out/Components/Register_Login/ForgotPassword.jsx';
import ResetPassword from './Logged_out/Components/Register_Login/ResetPassword.jsx';
import PrivateRoute from './Logged_out/Routes/PrivateRoute';
import AdminRoute from './Logged_out/Routes/AdminRoute';
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
//import Pace from "./Shared/Components/Pace";
import Blog from './Logged_out/Main'

ReactDOM.render(
 <BrowserRouter>
       <MuiThemeProvider theme={theme}>
         <CssBaseline />
         <GlobalStyles />
         <Suspense fallback={<Fragment />}>
     <Switch>
      <Route path='/' exact render={props => <App {...props} />} />
      <Route path='/blog' exact render={props => <Blog {...props} />} />
      <Route path='/login' exact render={props => <Login {...props} />} />
       <Route path='/register' exact render={props => <Register {...props} />} />
       <Route path='/users/password/forget' exact render={props => <ForgetPassword {...props} />} />
       <Route path='/users/password/reset/:token' exact render={props => <ResetPassword {...props} />} />
       <Route path='/users/activate/:token' exact render={props => <Activate {...props} />} />
      <PrivateRoute path="/private" exact component={Private} />
        <AdminRoute path="/admin" exact component={Admin} />
       <Redirect to='/' /> 
     </Switch>
     </Suspense>
     </MuiThemeProvider>
   </BrowserRouter>,
   document.getElementById('root')
 );


