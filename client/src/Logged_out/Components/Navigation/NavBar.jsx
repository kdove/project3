import React, { memo } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Hidden,
  IconButton,
  Grid,
  withStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import BookIcon from "@material-ui/icons/Book";
import NavigationDrawer from "../../../Shared/Components/NavigationDrawer";
import classNames from "classnames";
import logo from '../../assests/logo_transparent.png';

const styles = theme => ({
  appBar: {
    boxShadow: theme.shadows[0],
    backgroundColor: theme.palette.common.white
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  menuButtonText: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
    color: "#11326B"
  },
  noDecoration: {
    textDecoration: "none !important"
  },
  logo: {
    width: "200px",
    paddingBottom: theme.spacing(2),
    marginTop: theme.spacing(6),

  },
});

function NavBar(props) {
  const {
    classes,
    handleMobileDrawerOpen,
    handleMobileDrawerClose,
    mobileDrawerOpen,
    selectedTab
  } = props;
  const menuItems = [
    {
      link: "/",
      name: "Home",
      icon: <HomeIcon className="homeLink" />
    },
    {
      link: "/blog",
      name: "Blog",
      icon: <BookIcon className="blogLink" />
    },
    {
      link: "/register",
      name: "Sign Up",
      icon: <HowToRegIcon  className="signUpLink" />
    },
    {
      link: "/login",
      name: "Sign In",
      icon: <LockOpenIcon className="signInLink" />
    },
    {
    link: "/clientportal",
    name: "Client Portal",
    icon: <LockOpenIcon className="clientLink" />
  },
  ];
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div>
            {/*  CIRCA LOGO */}
            <Hidden smDown>
              <Grid item md={12}>
                <img src={logo} className={classNames(classes.logo, "logo")} alt="Circa-logo"/>
              </Grid>
            </Hidden>
          </div>
          <div>
            <Hidden mdUp>
              <IconButton
                className={classes.menuButton}
                onClick={handleMobileDrawerOpen}
                aria-label="Open Navigation"
              >
                <MenuIcon color="primary" />
              </IconButton>
            </Hidden>
            <Hidden smDown>
              {menuItems.map(element => {
                if (element.link) {
                  return (
                    <Link
                      key={element.name}
                      to={element.link}
                      className={classes.noDecoration}
                      onClick={handleMobileDrawerClose}
                    >
                      <Button
                        color="secondary"
                        size="large"
                        classes={{ text: classes.menuButtonText }}
                      >
                        {element.name}
                      </Button>
                    </Link>
                  );
                }
                return (
                  <Button
                    color="secondary"
                    size="large"
                    onClick={element.onClick}
                    classes={{ text: classes.menuButtonText }}
                    key={element.name}
                  >
                    {element.name}
                  </Button>
                );
              })}
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>
      <NavigationDrawer
        menuItems={menuItems}
        anchor="right"
        open={mobileDrawerOpen}
        selectedItem={selectedTab}
        onClose={handleMobileDrawerClose}
      />
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleMobileDrawerOpen: PropTypes.func,
  handleMobileDrawerClose: PropTypes.func,
  mobileDrawerOpen: PropTypes.bool,
  selectedTab: PropTypes.string,
  openRegister: PropTypes.func.isRequired,
  openLogin: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(memo(NavBar));
