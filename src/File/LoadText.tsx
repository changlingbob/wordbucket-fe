import React, { Component } from "react";
import Bucket from "wordbucket";
import { BucketState } from "../State/navigation";

export default class LoadText extends Component {
  public render() {
    return (
      <BucketState render={(bucket: Bucket) => {
        return (
          <div>{bucket.generate("hex")}</div>
        );
      }}/>
    );
  }
}
