import React from "react";
import Wordbucket from "wordbucket";
import { BucketState, IApplicationState } from "../../State/state";
import { Undoable } from "../../State/undomanager";
import "./Controls.scss";
import PortPanel from "./PortPanel/PortPanel";

interface IControlsState {
  content: string;
  doneFunc: (details?: string) => void;
  doneString: string;
  showPanel: boolean;
}
class Controls extends React.Component<any, IControlsState> {
  public constructor(props: any) {
    super(props);

    let content = "";
    let showPanel = false;
    if (window.location.search.indexOf("privacy") > -1) {
      content = "Apparently I legally need a privacy policy, and it's this: I wouldn't even know how to get your data back out of this app. If you choose to log in through Google, the app saves your bucket data to Google Drive, specifically so I don't have to figure out how to save data any other way, so consider your secret random outcomes safe.";
      showPanel = true;
    }

    this.state = {
      content,
      doneFunc: this.clearPanel,
      doneString: "Thanks",
      showPanel,
      // content: "",
      // doneFunc: (details: string) => null,
      // doneString: "",
    };
  }

  public render() {
    return (
      <BucketState
        render = {(state: IApplicationState) => {
          const doExport = (ev: any) => {
            this.setState({
              content: Wordbucket.serialise(state.path),
              doneFunc: this.clearPanel,
              doneString: "OK",
              showPanel: true,
            });
          };

          const doHelp = (ev: any) => {
            this.setState({
              content: "Buckets are named and have a parent. Each bucket contains entries, which have a weight used for rolling on the table (supports divisions down to 0.1) and the words to use. To embed another table in the result, use `${fully.qualified.bucket.name}`. You can comma separate bucket names within the braces, and it will comma separate the results.\n" +
              "\n" +
              "Currently there is one pair of supported commands: within a table query, use `$a` or `$an` to use the appropriate identifier depending on the result of the table query.\n" +
              "\n" +
              "eg: `${$a, $size, $colour} table` may generates `a large blue table` or `an enormous pink table`, depending on the results. If there's no generated output, it the word used to call the command will be used, in this case `a table`.\n",
              doneFunc: this.clearPanel,
              doneString: "OK",
              showPanel: true,
            });
          };

          return (
            <div className="controls">
                {/* This className is magic! */}
                <div className="g-signin2">
                  Login
                </div>
              <div className="app">
              <div
                  className="help button"
                  onClick={doHelp}
                  >Really Basic Help</div>
                <div
                  className="undo button"
                  onClick={Undoable.undo}
                  >Undo</div>
                <div
                  className="redo button"
                  onClick={Undoable.redo}
                  >Redo</div>
                <div
                  className="import button"
                >
                  Import
                </div>
                <div
                  className="export button"
                  onClick={doExport}
                >
                  Export
                </div>
              </div>
              {
                this.state.showPanel &&
                <PortPanel
                  content={this.state.content}
                  doneString={this.state.doneString}
                  doneFunc={this.state.doneFunc}
                />
              }
            </div>
          );
        }}
      />
    );
  }

  private clearPanel = () => {
    this.setState({
      showPanel: false,
    });
  }
}

export default Controls;
