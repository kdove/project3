import React, { Suspense } from "react";
import { CircaLoading } from "matx";

const CircaSuspense = props => {
  return <Suspense fallback={<CircaLoading />}>{props.children}</Suspense>;
};

export default CircaSuspense;