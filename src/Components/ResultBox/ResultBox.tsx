import React from "react";
import Bucket from "wordbucket";
import { BucketState, IApplicationState } from "../../State/state";
import "./ResultBox.scss";

class ResultBox extends React.Component {
  public render() {
    return (
      <BucketState render={(state: IApplicationState) => {
        return (
          <div className="result-container">
            <div className="results">{Bucket.generate(state.path)}</div>
            <div
              className="roller"
              onClick={(ev) => this.forceUpdate()}
            >Re-roll</div>
          </div>
        );
      }}/>
    );
  }
}

export default ResultBox;
