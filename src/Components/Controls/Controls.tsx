import React from "react";
import { WordManager } from "wordbucket";
import { BucketState, IApplicationState } from "../../State/state";
import { Undoable } from "../../State/undomanager";
import "./Controls.scss";
import { content } from "./documentation";
import PortPanel from "./PortPanel/PortPanel";

interface IControlsState {
  content: string;
  doneFunc: (details?: string) => void;
  doneString: string;
  showPanel: boolean;
}

const loadingPrompt =
  "Replace this with serialised bucket data to load it into the engine";

class Controls extends React.Component<any, IControlsState> {
  public constructor(props: any) {
    super(props);

    let content = "";
    let showPanel = false;
    if (window.location.search.indexOf("privacy") > -1) {
      content =
        "Apparently I legally need a privacy policy, and it's this: I wouldn't even know how to get your data back out of this app. If you choose to log in through Google, the app saves your bucket data to Google Drive, specifically so I don't have to figure out how to save data any other way, so consider your secret random outcomes safe.";
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
        render={(state: IApplicationState | null) => {
          const doExport = (ev: any) => {
            const bucketRoot = state?.path.split(".")[0] || "";
            const bucketNames = WordManager.getBuckets().map(
              (bucket) => bucket.title
            );
            this.setState({
              content: WordManager.serialise(
                ...bucketNames.filter(
                  (bucket) => bucket.indexOf(bucketRoot) === 0
                )
              ),
              doneFunc: this.clearPanel,
              doneString: "OK",
              showPanel: true,
            });
          };

          const doImport = (ev: any) => {
            this.setState({
              content: loadingPrompt,
              doneFunc: this.loadBucket,
              doneString: "OK",
              showPanel: true,
            });
          };

          const doHelp = (ev: any) => {
            this.setState({
              content,
              doneFunc: this.clearPanel,
              doneString: "OK",
              showPanel: true,
            });
          };

          return (
            <div className="controls">
              {/* This className is magic! */}
              <div className="g-signin2">Login</div>
              <div className="app">
                <div className="help button" onClick={doHelp}>
                  Really Basic Help
                </div>
                <div className="undo button" onClick={Undoable.undo}>
                  Undo
                </div>
                <div className="redo button" onClick={Undoable.redo}>
                  Redo
                </div>
                <div className="import button" onClick={doImport}>
                  Import
                </div>
                <div className="export button" onClick={doExport}>
                  Export
                </div>
              </div>
              {this.state.showPanel && (
                <PortPanel
                  content={this.state.content}
                  doneString={this.state.doneString}
                  doneFunc={this.state.doneFunc}
                />
              )}
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
  };

  private loadBucket = (details?: string) => {
    if (details && details !== loadingPrompt) {
      WordManager.deserialise(details);
    }
    this.setState({
      showPanel: false,
    });
  };
}

export default Controls;
