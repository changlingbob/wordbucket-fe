import React, { Component, ReactNode } from "react";
import Bucket from "wordbucket";
import { BucketState, INavigationState } from "../State/navigation";

const LoadText = () => {
  return (
    <BucketState render={(state: INavigationState) => {
      return (
        <div>{state.bucket.generate(state.pathname)}</div>
      );
    }}/>
  );
};

export default LoadText;
