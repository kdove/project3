import React, { memo, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import AOS from "aos/dist/aos";
import { withStyles } from "@material-ui/core";
import NavBar from "./Components/Navigation/NavBar";
import Footer from "./Components/Footer/Footer";
import "aos/dist/aos.css";
import CookieRules from "./Components/Cookies/CookieRules";
import CookieConsent from "./Components/Cookies/CookieConsent";
import dummyBlogPosts from "../Logged_out/Components/dummy_data/blogPosts";
import DialogSelector from "./Components/Register_Login/DialogSelector";
import Routing from "../Logged_out/Routes/Routing";
import smoothScrollTop from "./../Shared/Functions/smoothScrollTop";

AOS.init({ once: true });

const styles = (theme) => ({
  wrapper: {
    backgroundColor: theme.palette.common.white,
    overflowX: "hidden",
  },
});

function Main(props) {
  const { classes } = props;
  const [selectedTab, setSelectedTab] = useState(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(null);
  const [isCookieRulesOpen, setIsCookieRulesOpen] = useState(false);

  const selectHome = useCallback(() => {
    smoothScrollTop();
    document.title =
      "Circa";
    setSelectedTab("Home");
  }, [setSelectedTab]);

  const selectBlog = useCallback(() => {
    smoothScrollTop();
    document.title = "Circa - Blog";
    setSelectedTab("Blog");
  }, [setSelectedTab]);

  const openLogin = useCallback(() => {
    setDialogOpen("login");
    setIsMobileDrawerOpen(false);
  }, [setDialogOpen, setIsMobileDrawerOpen]);

  const closeDialog = useCallback(() => {
    setDialogOpen(null);
  }, [setDialogOpen]);

  const openRegister = useCallback(() => {
    setDialogOpen("register");
    setIsMobileDrawerOpen(false);
  }, [setDialogOpen, setIsMobileDrawerOpen]);

  const openTerms = useCallback(() => {
    setDialogOpen("termsOfService");
  }, [setDialogOpen]);

  const handleMobileDrawerOpen = useCallback(() => {
    setIsMobileDrawerOpen(true);
  }, [setIsMobileDrawerOpen]);

  const handleMobileDrawerClose = useCallback(() => {
    setIsMobileDrawerOpen(false);
  }, [setIsMobileDrawerOpen]);

  const openResetPassword = useCallback(() => {
    setDialogOpen("resetPassword");
  }, [setDialogOpen]);

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
    <div className={classes.wrapper}>
      {!isCookieRulesOpen && (
        <CookieConsent
          handleCookieRulesOpen={handleCookieRulesOpen}
        />
      )}
      <DialogSelector
        openLogin={openLogin}
        dialogOpen={dialogOpen}
        onClose={closeDialog}
        openTerms={openTerms}
        openRegister={openRegister}
        openResetPassword={openResetPassword}
      />
      <CookieRules
        open={isCookieRulesOpen}
        onClose={handleCookieRulesClose}
      />
      <NavBar
        selectedTab={selectedTab}
        selectTab={setSelectedTab}
        openLogin={openLogin}
        openRegister={openRegister}
        mobileDrawerOpen={isMobileDrawerOpen}
        handleMobileDrawerOpen={handleMobileDrawerOpen}
        handleMobileDrawerClose={handleMobileDrawerClose}
      />
      <Routing
        blogPosts={blogPosts}
        selectHome={selectHome}
        selectBlog={selectBlog}
      />
      <Footer />
    </div>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));
