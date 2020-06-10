import React, { Fragment } from "react";
import { Link, Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  Typography,
  Button,
  withStyles,
  withWidth,
  isWidthUp
} from "@material-ui/core";
import headerImage from "../../assests/gifs/homepage-hero.gif";
import WaveBorder from "../../../Shared/Components/WaveBorder";

const styles = theme => ({
  extraLargeButtonLabel: {
    fontSize: theme.typography.body1.fontSize,
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.h6.fontSize
    }
  },
  extraLargeButton: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    }
  },
  wrapper: {
    position: "relative",
    backgroundColor: theme.palette.secondary.main,
    paddingBottom: theme.spacing(2),
  },
  image: {
    marginTop: "50px",
    maxWidth: "100%",
    //verticalAlign: "middle",
    //borderRadius: theme.shape.borderRadius,
    //boxShadow: theme.shadows[4]
  },
  container: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(12),
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(9)
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(6)
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3)
    }
  },
});

function HeadSection(props) {
  const { classes } = props;
  return (
    <Fragment>
      <div className={classNames( classes.wrapper)}>
        <div className={classNames("container-fluid", classes.container)} >
          <img className={classes.image} src={headerImage}/>
          </div>
      </div>
    </Fragment>
  );
}

HeadSection.propTypes = {
  classes: PropTypes.object,
};

export default withWidth()(
  withStyles(styles, { withTheme: true })(HeadSection)
);
