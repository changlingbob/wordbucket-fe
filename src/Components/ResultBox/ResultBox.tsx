import React from "react";
import Wordbucket from "wordbucket";
import { BucketState, IApplicationState } from "../../State/state";
import "./ResultBox.scss";

// Classified so that we can do a forceUpdate.
class ResultBox extends React.Component {
  public render() {
    return (
      <BucketState render={(state: IApplicationState) => {
        const generate = (): string => {
          try {
            return Wordbucket.generate(state.path);
          } catch (e) {
            // tslint:disable-next-line: no-console
            console.error(e);
            return "Error generating string";
          }
        };

        if (state.path === "" || !!!Wordbucket.check(state.path)) {
          return <div className="result-title">
            Select a table to start.
          </div>;
        }

        return (
          <>
            <div className="result-title">{state.path}</div>
            <div className="result-container">
              <div className="results">{generate()}</div>
              <div
                className="roller"
                onClick={(ev) => this.forceUpdate()}
              >Re-roll</div>
            </div>
          </>
        );
      }}/>
    );
  }
}

export default ResultBox;
