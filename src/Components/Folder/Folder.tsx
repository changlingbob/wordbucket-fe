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
  bucket?: Bucket;
  collapsed: boolean;
  create: boolean;
  path: string;
  parentName?: string;
}

class Folder extends React.Component<IFolderProps, IFolderState>  {

  constructor(props: IFolderProps) {
    super(props);
    this.state = {
      ...props,
      collapseChildren: !!props.bucket && !props.inPath(props.bucket.getName()),
    };
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
          key="create"
          create={false}
          parentName={bucket.getName()}
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
        <div
            className={classNames(
              "folder",
              "new-bucket",
            )}
          >
          <span>{this.state.parentName}.</span>
            <input
              className="title"
              onClick={() => {
                // tslint:disable-next-line no-console
                console.log("click");
              }}
            />
            <div
              className="create confirm"
              // onClick={this.newBucket}
            />
          </div>      );
    }
  }

  private newBucket() {
    return;
  }}

export default Folder;
