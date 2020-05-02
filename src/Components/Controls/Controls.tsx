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
    this.state = {
      content: "this is my content hoorah",
      doneFunc: () => alert(1),
      doneString: "donezo",
      showPanel: false,
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
              // content: Bucket.serialize(),
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
