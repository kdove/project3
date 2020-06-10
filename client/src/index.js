import React, { Fragment,  Suspense,  lazy } from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

//ALERTS
import 'react-toastify/dist/ReactToastify.css';

// IMPORTING ALL LOGIN & REGISTRATION COMPONENTS
import Login from './Logged_out/Components/Register_Login/Login.jsx';
import Register from './Logged_out/Components/Register_Login/Register.jsx';
import Activate from './Logged_out/Components/Register_Login/Activate.jsx';
import Private from './Logged_out/Components/Register_Login/Private.jsx';
import Admin from './Logged_out/Components/Register_Login/Admin.jsx';
import ForgetPassword from './Logged_out/Components/Register_Login/ForgotPassword.jsx';
import ResetPassword from './Logged_out/Components/Register_Login/ResetPassword.jsx';

//IMPORTING APP 
import App from "./App";

//import history from "history.js";

//IMPORTING WEBSITE & BLOG
import Blog from './Logged_out/Main'

//USER ROLE ROUTES
import PrivateRoute from './Routes/PrivateRoute';
import AdminRoute from './Routes/AdminRoute';

//
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";


const LoggedInComponent = lazy(() => import("./Logged_In/Main"));



ReactDOM.render(
 <BrowserRouter  >
       <MuiThemeProvider theme={theme}>
         <CssBaseline />
         <GlobalStyles />
         <Suspense fallback={<Fragment />}>
     <Switch>
       {/* Route to Home Page/Website */}
      <Route path='/' exact render={props => <App {...props} />} />
      
      {/* Route to blog page */}
      <Route path='/blog' exact render={props => <Blog {...props} />} />

      {/* Route to login page */}
      <Route path='/login' exact render={props => <Login {...props} />} />

      {/* Route to register page */}
       <Route path='/register' exact render={props => <Register {...props} />} />

       {/* Route to forgot password page */} 
       <Route path='/users/password/forgot' exact render={props => <ForgetPassword {...props} />} />
       {/* Route to reset password */}
       <Route path='/users/password/reset/:token' exact render={props => <ResetPassword {...props} />} />

       {/* Route to activate accout */}
       <Route path='/users/activate/:token' exact render={props => <Activate {...props} />} />
       {/* Route to client portal */}
      <PrivateRoute path="/private" exact component={Private} />
      
      {/* Route to Admin Portal */}
        <AdminRoute path="/admin" exact component={Admin} />

      
         <LoggedInComponent path="/c"  />
    

        {/* Redirect */}
       <Redirect to='/' /> 
       
     </Switch>
     </Suspense>
     </MuiThemeProvider>
   </BrowserRouter>,
   document.getElementById('root')
 );


