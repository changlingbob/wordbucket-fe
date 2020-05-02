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
              content: Wordbucket.serialise(),
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
