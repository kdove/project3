import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, isWidthUp, withWidth } from "@material-ui/core";
import CodeIcon from "@material-ui/icons/Code";
import BuildIcon from "@material-ui/icons/Build";
import BarChartIcon from "@material-ui/icons/BarChart";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import CloudIcon from "@material-ui/icons/Cloud";
import MeassageIcon from "@material-ui/icons/Message";
import calculateSpacing from "./calculateSpacing";
import FeatureCard from "./FeatureCard";

const iconSize = 30;

const features = [
  {
    color: "#00C853",
    headline: "Client Portal",
    text:
      "Our Client Portal provides your clients access to their own projects, contracts, services and account in order to improve transparency and help clients help themselves. It offers your clients on-demand access for the services you do for them smoothly.",
    icon: <BuildIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0"
  },
  {
    color: "#6200EA",
    headline: "Easily Assign Tasks",
    text:
      "Using this easily assign tasks feature in Circa Dashboard CRM will give you the ability to assign tasks to your team members internally as well as the ability to assign tasks to your clients externally whenever you want them to do, to share specific documents with you, or ask them specific questions through our CRM portal",
    icon: <CalendarTodayIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "200"
  },
  {
    color: "#0091EA",
    headline: "Chat",
    text:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
    icon: <MeassageIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "0"
  },
  {
    color: "#DD2C00",
    headline: "Customized Financial Reports",
    text:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
    icon: <BarChartIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "0"
  },
  {
    color: "#304FFE",
    headline: "Online Document Storage",
    text:
      "Keep confidential data secure with cloud storage. Using online storage, you can access all your data safely without using any physical storage medium. Our Online document storage allows you to securely store documents and files online to share within your company, with remote work forces and business partners.",
    icon: <CloudIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0"
  },
  {
    color: "#C51162",
    headline: "Bank Account Integrations",
    text:
      "Manually adding bank transactions is an extremely difficult task for every accountant. One mistake may affect your whole sheet. Circa comes with bank account synchronizer.",
    icon: <CodeIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "200"
  },
];

function FeatureSection(props) {
  const { width } = props;
  return (
    <div style={{ backgroundColor: "#FFF" }}>
      <div className="container-fluid lg-p-top">
        <Typography variant="h3" align="center" className="lg-mg-bottom">
          Everything you need in one place.
        </Typography>
        <div className="container-fluid lg-mg-bottom">
          <Grid container spacing={calculateSpacing(width)}>
            {features.map(element => (
              <Grid
                item
                xs={6}
                md={4}
                data-aos="zoom-in-up"
                data-aos-delay={
                  isWidthUp("md", width) ? element.mdDelay : element.smDelay
                }
                key={element.headline}
              >
                <FeatureCard
                  Icon={element.icon}
                  color={element.color}
                  headline={element.headline}
                  text={element.text}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

FeatureSection.propTypes = {
  width: PropTypes.string.isRequired
};

export default withWidth()(FeatureSection);
