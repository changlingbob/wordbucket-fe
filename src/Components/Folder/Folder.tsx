import classNames from "classnames";
import React from "react";
import { Bucket } from "wordbucket";
import { NavLink } from "../../State/state";
import Creator from "./Creator";
import "./Folder.scss";

interface IFolderState extends IFolderProps {
  collapseChildren: boolean;
}

interface IFolderProps {
  inPath: (bucket: Bucket) => boolean;
  bucket: Bucket;
  collapsed: boolean;
  create: boolean;
  path: string;
  parent?: Folder;
  parentName: string;
}

class Folder extends React.Component<IFolderProps, IFolderState> {

  constructor(props: IFolderProps) {
    super(props);
    this.state = {
      collapseChildren: !!props.bucket && !props.inPath(props.bucket),
      ...props,
    };
  }

  public componentWillReceiveProps(props: IFolderProps) {
    if (props.collapsed !== this.state.collapsed ||
      props.path !== this.state.path) {
      this.setState({
        ...props,
      });
    }
  }

  public render() {
    const bucket = this.state.bucket;
    const children = [];
    for (const child of bucket.getChildren()) {
      children.push(<Folder
        bucket={child}
        collapsed={this.state.collapseChildren}
        inPath={this.state.inPath}
        path={this.state.path}
        key={child.title}
        create={false}
        parentName={this.constructFullName()}
      />);
    }
    if (this.state.create) {
      children.push(<Creator
        parentName={this.constructFullName()}
        parentFolder={this}
      />);
    }

    return (
      <div
        className={classNames(
          {root: bucket.title.length === 0},
          {folder: bucket.title.length > 0},
          {collapsed: this.props.collapsed},
          {focused: this.constructFullName() === this.state.path},
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
          path={this.constructFullName()}
          onClick={() => {
            this.setState({collapseChildren: false});
          }}
        >
          {bucket.title}
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

  private constructFullName(): string {
    let out = this.state.parentName ? this.state.parentName + "." : "";
    out += this.state.bucket?.title;

    return out;
  }

}

export default Folder;
