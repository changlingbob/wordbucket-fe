import classNames from "classnames";
import React from "react";
import Bucket from "wordbucket/out/Bucket";
import { IApplicationState, NavLink } from "../../State/state";
import "./Folder.scss";

interface IFolderState extends IFolderProps {
  collapseChildren: boolean;
}

interface IFolderProps {
  inPath: (bucketName: string) => boolean;
  bucket?: Bucket|undefined;
  collapsed: boolean;
  create: boolean;
  path: string;
}

class Folder extends React.Component<IFolderProps, IFolderState>  {

  constructor(props: IFolderProps) {
    super(props);
    this.state = {
      ...props,
      collapseChildren: !!props.bucket && !props.inPath(props.bucket.getName()),
    };
  }

  public shouldComponentUpdate(nextProps: IFolderProps, nextState: IFolderState) {
    return false;
  }

  public componentWillReceiveProps(props: IFolderProps) {
    this.setState({
      ...props,
    });
  }

  public render() {
    const bucket = this.state.bucket;
    if (bucket) {
      const children = [];
      for (const child of bucket.getChildren()) {
        children.push(<Folder
          bucket={child}
          collapsed={this.state.collapseChildren}
          inPath={this.state.inPath}
          path={this.state.path}
          key={child.getName()}
          create={false}
        />);
      }
      if (this.state.create) {
        children.push(<Folder
          collapsed={this.state.collapseChildren}
          inPath={this.state.inPath}
          path={this.state.path}
          key="test"
          create={false}
        />);
      }

      if (bucket.getName().length === 0) {
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
              {focused: bucket.getName() === this.state.path},
            )}
          >
            {bucket.getChildren().length > 0 ? <div
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
            <div
              className="create"
              onClick={() => {
                this.setState({create: true});
              }}
            />
            <div className="children">
              {children}
            </div>
          </div>
        );
      }
    } else {
      return (
        <></>
      );
    }
  }

  private newBucket() {
    return;
  }}

export default Folder;
