import react from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
function dashboardIcon(props) {
  //const dashboardfill = props.dashboardfill || "blue";
    const style = {
        fill: "none",
        stroke:"#344154",
        strokeLineCap: "round",
        strokeLineJoin: "round",
        strokeWidth: "1.06px",
    }
    const {
    classes,
    
  return (
    
      
      <svg
      className="Dashboard"
      xmlns="http://www.w3.org/2000/svg"
      width="38"
      height="38"
      viewBox="0 0 38 38"
      aria-labelledby="Dashboard"
    >
    <title id="Dashboard">Dashboard</title>
 <g id="a023ec94-caec-4f66-b370-1bc357063baf" data-name="Layer 2"><g id="b4ab87d5-61db-485f-96e7-093c68ca2eef" data-name="Icon Set"><polygon class="b6fdbee9-b189-43b0-808d-57c2894ed94c" points="12.33 26.53 12.33 37.53 4.33 37.53 4.33 15.92 19.33 5.68 34.33 15.92 34.33 37.53 27.33 37.53 27.33 26.53 12.33 26.53"/><polyline class="b6fdbee9-b189-43b0-808d-57c2894ed94c" points="0.53 13.76 19.11 1.44 25.32 5.56 25.33 5.57 25.33 0.53 30.33 0.53 30.33 8.88 30.33 8.88 37.68 13.76"/><line class="b6fdbee9-b189-43b0-808d-57c2894ed94c" x1="23.42" y1="17.85" x2="21.16" y2="15.59"/><line class="b6fdbee9-b189-43b0-808d-57c2894ed94c" x1="21.93" y1="20.38" x2="17.13" y2="15.59"/><line class="b6fdbee9-b189-43b0-808d-57c2894ed94c" x1="17.9" y1="20.38" x2="15.91" y2="18.39"/><path class="a3bf0b6b-0423-439f-84a6-36bd70be238b" d="M25.83,35V28h-12v7a8.81,8.81,0,0,1,12,0Z"/></g></g>

      </svg>
  );
}

dashboardIcon.propTypes = {
    classes: PropTypes.object.isRequired,
}
export default withStyles(styles, (dashboardIcon));
