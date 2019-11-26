import classNames from "classnames";
import React from "react";
import Bucket from "wordbucket/out/Bucket";
import { NavLink } from "../../State/state";
import { addBucket } from "../../State/undomanager";
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
  parent?: Folder;
  parentName?: string;
}

class Folder extends React.Component<IFolderProps, IFolderState>  {
  private inputRef: any;

  constructor(props: IFolderProps) {
    super(props);
    this.state = {
      ...props,
      collapseChildren: !!props.bucket && !props.inPath(props.bucket.getName()),
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
          parent={this}
          parentName={bucket.getName()}
        />);
      }

      return (
        <div
          className={classNames(
            {root: bucket.getName().length === 0},
            {folder: bucket.getName().length > 0},
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
    } else {
      console.log(this.state);
      console.log(Bucket.get(""));
      return (
        <div
            className={classNames(
              {root: !this.state.parentName || this.state.parentName.length === 0},
              {folder: this.state.parentName && this.state.parentName.length > 0},
              "new-bucket",
            )}
          >
          {
            this.state.parentName && this.state.parentName.length > 0 ?
            <span>{this.state.parentName}.</span>
            : ""
          }
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

  private newBucket(event: any) {
    if (this.inputRef.current) {
      const parentName = this.state.parentName || "";
      const newName = (parentName ? `${parentName}.` : "") + this.inputRef.current.value;

      addBucket(newName, Bucket.get(parentName), () => {
        if (this.state.parent) {
          this.state.parent.setState({create: false});
        }
      });
    }
  }
}

export default Folder;
