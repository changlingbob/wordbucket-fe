import classNames from "classnames";
import React from "react";
import Wordbucket, { Bucket } from "wordbucket";
import { NavLink } from "../../State/state";
import { addBucket } from "../../State/undomanager";
import "./Folder.scss";

interface IFolderState extends IFolderProps {
  collapseChildren: boolean;
}

interface IFolderProps {
  inPath: (bucket: Bucket) => boolean;
  bucket?: Bucket;
  collapsed: boolean;
  create: boolean;
  path: string;
  parent?: Folder;
  parentName: string;
}

class Folder extends React.Component<IFolderProps, IFolderState>  {
  private inputRef: any;

  constructor(props: IFolderProps) {
    super(props);
    this.state = {
      collapseChildren: !!props.bucket && !props.inPath(props.bucket),
      ...props,
    };

    this.inputRef = React.createRef();
    this.newBucket = this.newBucket.bind(this);
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
    if (bucket) {
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
        children.push(<Folder
          collapsed={this.state.collapseChildren}
          inPath={this.state.inPath}
          path={this.state.path}
          key="create"
          create={false}
          parent={this}
          parentName={this.constructFullName()}
        />);
      }

      return (
        <div
          className={classNames(
            {root: bucket.title.length === 0},
            {folder: bucket.title.length > 0},
            {collapsed: this.props.collapsed},
            {focused: bucket.title === this.state.path},
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
    } else {
      return (
        <div
            className={classNames(
              {root: !this.state.parentName || this.state.parentName.length === 0},
              {folder: this.state.parentName && this.state.parentName.length > 0},
              "new-bucket",
            )}
          >
          <input
            ref={this.inputRef}
            className="title"
          />
          <div
            className="create confirm"
            onClick={this.newBucket}
          />
        </div>);
    }
  }

  private constructFullName(): string {
    let out = this.state.parentName ? this.state.parentName + "." : "";
    out += this.state.bucket?.title;

    return out;
  }

  private newBucket(event: any) {
    if (this.inputRef.current) {
      const parentName = this.state.parentName || "";
      const newName = this.inputRef.current.value;

      addBucket(newName, Wordbucket.fetch(parentName), () => {
        if (this.state.parent) {
          this.state.parent.setState({create: false});
        }
      });
    }
  }
}

export default Folder;
