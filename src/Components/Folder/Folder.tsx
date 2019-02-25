import classNames from "classnames";
import React from "react";
import Bucket from "wordbucket";
import { INavigationState, NavLink } from "../../State/navigation";
import "./Folder.scss";

interface IFolderState extends INavigationState {
  collapseChildren: boolean;
  collapsed: boolean;
}

interface IFolderProps {
  state: INavigationState;
  collapsed: boolean;
}

class Folder extends React.Component<IFolderProps, IFolderState>  {
  private appState: INavigationState;

  constructor(props: IFolderProps) {
    super(props);
    this.appState = props.state;
    this.state = {
      collapseChildren: !props.state.inPath(props.state.bucket.getName()),
      collapsed: props.collapsed,
      ...props.state,
    };
  }

  public render() {
    const bucket = this.state.bucket;
    const children = [];
    for (const child of bucket.getChildren()) {
      children.push(<Folder
        state={{...this.appState, bucket: child}}
        collapsed={this.state.collapseChildren}
        key={child.getName()}
      />);
    }

    if (this.state.bucket.getName().length === 0) {
      return (
        <>
          {children}
        </>
      );
    } else {
      return (
        <div
          className={classNames(
            "folder",
            {collapsed: this.props.collapsed},
          )}
        >
          {this.state.bucket.getChildren().length > 0 ? <div
            className="toggle"
            onClick={() => {
              this.setState({collapseChildren: !this.state.collapseChildren});
            }}
            >
            {this.state.collapseChildren ? "+" : "-"}
          </div> : ""}
          <NavLink
            className="title"
            path={bucket.getName()}
            onClick={() => {
              this.setState({collapseChildren: false});
            }}
          >
            {bucket.getName()}
          </NavLink>
          <div className="children">
            {children}
          </div>
        </div>
      );
    }
  }
}

export default Folder;
