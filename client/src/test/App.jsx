import React, { memo, useState, useEffect, useCallback, lazy } from "react";
import { Link, Redirect } from 'react-router-dom';

//
import AOS from "aos/dist/aos";
import "aos/dist/aos.css";


import { signout } from './Services/auth';

//ALERTS
import { ToastContainer, toast } from 'react-toastify';

import api from "./api";

//IMPORTING WEBSITE COMPONENTS
import NavBar from "./Logged_out/Components/Navigation/NavBar";
import Footer from "./Logged_out/Components/Footer/Footer";
import CookieRules from "./Logged_out/Components/Cookies/CookieRules";
import CookieConsent from "./Logged_out/Components/Cookies/CookieConsent";
import dummyBlogPosts from "./Logged_out/Components/dummy_data/blogPosts";
//import TermsOfService from "./Logged_out/Components/Register_Login/TermsOfService";

//IMPORT SHARED COMPONENTS
import smoothScrollTop from "./Shared/Functions/smoothScrollTop";

//import DialogSelector from "./Components/Register_Login/DialogSelector";


//IMPORT BLOG ROUTES
import Routing from "./Logged_out/Routes/Routing";


//IMPORT SERVICE WORKER
import registerServiceWorker from "./registerServiceWorker";

AOS.init({ once: true });

function App(props) {
  const { classes,history } = props;
  const [selectedTab, setSelectedTab] = useState(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(null);
  const [isCookieRulesOpen, setIsCookieRulesOpen] = useState(false);

  // Webpage tab
  const selectHome = useCallback(() => {
    smoothScrollTop();
    document.title =
      "Circa";
    setSelectedTab("Home");
  }, [setSelectedTab]);
  const openLogin = useCallback(() => {
    setDialogOpen("login");
    setIsMobileDrawerOpen(false);
  }, [setDialogOpen, setIsMobileDrawerOpen]);

  const closeDialog = useCallback(() => {
    setDialogOpen(null);
  }, [setDialogOpen]);

  const openTerms = useCallback(() => {
    setDialogOpen("termsOfService");
  }, [setDialogOpen]);
  const handleMobileDrawerOpen = useCallback(() => {
    setIsMobileDrawerOpen(true);
  }, [setIsMobileDrawerOpen]);

  const handleMobileDrawerClose = useCallback(() => {
    setIsMobileDrawerOpen(false);
  }, [setIsMobileDrawerOpen]);

  //Blog Webpage Tab
  const selectBlog = useCallback(() => {
    smoothScrollTop();
    document.title = "Circa - Blog";
    setSelectedTab("Blog");
  }, [setSelectedTab]);

  const fetchBlogPosts = useCallback(() => {
    const blogPosts = dummyBlogPosts.map((blogPost) => {
      let title = blogPost.title;
      title = title.toLowerCase();
      /* Remove unwanted characters, only accept alphanumeric and space */
      title = title.replace(/[^A-Za-z0-9 ]/g, "");
      /* Replace multi spaces with a single space */
      title = title.replace(/\s{2,}/g, " ");
      /* Replace space with a '-' symbol */
      title = title.replace(/\s/g, "-");
      blogPost.url = `/blog/post/${title}`;
      blogPost.params = `?id=${blogPost.id}`;
      return blogPost;
    });
    setBlogPosts(blogPosts);
  }, [setBlogPosts]);

  const handleCookieRulesOpen = useCallback(() => {
    setIsCookieRulesOpen(true);
  }, [setIsCookieRulesOpen]);

  const handleCookieRulesClose = useCallback(() => {
    setIsCookieRulesOpen(false);
  }, [setIsCookieRulesOpen]);

  useEffect(fetchBlogPosts, []);
  return (
<div>
{!isCookieRulesOpen && (
        <CookieConsent
          handleCookieRulesOpen={handleCookieRulesOpen}
        />
      )}
              <button
              onClick={() => {
              signout(() => {
              toast.error('Signout Successfully');
              history.push('/');});
            }}className='mt-5 tracking-wide font-semibold bg-pink-500 text-gray-100 w-full py-4 rounded-lg hover:bg-pink-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'>
            <i className='fas fa-sign-out-alt  w-6  -ml-2' />
            <span className='ml-3'>Signout</span>
            </button>
              <button onClick = {createToken}>Create new Token</button>
              <br/>
              <input type="text" id="username" /> <button onClick={createTestUser}>Create Test User</button>
              <br/>
              <button onClick = {getStatment}>The get statment button, press only after hitting authenticate</button>
              <CookieRules
        open={isCookieRulesOpen}
        onClose={handleCookieRulesClose}
      />
              <NavBar
                selectedTab={selectedTab}
                selectTab={setSelectedTab}

                mobileDrawerOpen={isMobileDrawerOpen}
                handleMobileDrawerOpen={handleMobileDrawerOpen}
                handleMobileDrawerClose={handleMobileDrawerClose}/>
              <Routing
                blogPosts={blogPosts}
                selectHome={selectHome}
                selectBlog={selectBlog}/>
              <Footer />
              </div>
  );
}

let currentToken = null;
function createToken() {
  api.authenticate().then(response => {
    console.log(response);
    console.log(response.token);
    alert(response.token);
    currentToken = response.token;
  });
};

function createTestUser() {
  const $text = document.getElementById("username").value;
  //alert($text);
  api.createTestUser({
    username: $text,
    token: currentToken
  }).then(response => {
    console.log(response);
    alert(`id: ${response.id}, username: ${response.username}, createDate: ${response.createdDate}`);
  });
}

function getStatment() {
  //mostly hard coded data for testing purposes
  const info = {
    token: currentToken,
    customerId: 1006445022,
    accountId: 1019548601
  }
  api.getStatement(info).then(response => {
    //TODO
    //somehow save the pdf response here
  });
}

registerServiceWorker();

export default App;
