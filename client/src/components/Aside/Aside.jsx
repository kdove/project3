import React from "react";

function Aside() {
  return (
    <div className={`container${props.fluid ? "-fluid" : ""}`} {...props} />
  );
}

export default Aside;
