import classNames from "classnames";
import React from "react";
import { Bucket, WordManager } from "wordbucket";
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
    if (
      props.collapsed !== this.state.collapsed ||
      props.path !== this.state.path
    ) {
      this.setState({
        ...props,
      });
    }
  }

  public render() {
    const bucket = this.state.bucket;

    const childBuckets = (() => {
      const children: Bucket[] = [];
      WordManager.getBuckets()
        .filter((bucket) => {
          return (
            bucket.title.length > this.props.bucket.title.length &&
            bucket.title.slice(0, this.props.bucket.title.length) ===
              this.props.bucket.title &&
            !bucket.title.slice(this.props.bucket.title.length + 1).match(/\./)
          );
        })
        .forEach((bucket) => {
          children.push(bucket);
        });

      return children;
    })();

    const children = childBuckets.map((child) => (
      <Folder
        bucket={child}
        collapsed={this.state.collapseChildren}
        inPath={this.state.inPath}
        path={this.state.path}
        key={child.title}
        create={false}
        parentName={this.props.bucket.title}
      />
    ));

    if (this.state.create) {
      children.push(
        <Creator parentName={this.props.bucket.title} parentFolder={this} />
      );
    }

    return (
      <div
        className={classNames(
          { root: bucket.title.length === 0 },
          { folder: bucket.title.length > 0 },
          { collapsed: this.props.collapsed },
          { focused: this.props.bucket.title === this.state.path }
        )}
      >
        {childBuckets.length > 0 ? (
          <div
            className="toggle"
            onClick={() => {
              this.setState({ collapseChildren: !this.state.collapseChildren });
            }}
          >
            {this.state.collapseChildren ? "+" : "-"}
          </div>
        ) : (
          ""
        )}
        <NavLink
          className="title"
          path={this.props.bucket.title}
          onClick={() => {
            this.setState({ collapseChildren: false });
          }}
        >
          {bucket.title}
        </NavLink>
        <div
          className="create"
          onClick={() => {
            this.setState({ create: true });
          }}
        />
        <div className="children">{children}</div>
      </div>
    );
  }
}

export default Folder;
