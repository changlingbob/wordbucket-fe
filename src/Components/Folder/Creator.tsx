import classNames from "classnames";
import React from "react";
import { addBucket } from "../../State/undomanager";
import Folder from "./Folder";

interface ICreatorProps {
  parentFolder?: Folder;
  parentName: string;
}

class Creator extends React.Component<ICreatorProps> {
  private parentName?: string;
  private inputRef: any;

  constructor(props: ICreatorProps) {
    super(props);

    this.parentName = props.parentName;

    this.inputRef = React.createRef();
    this.newBucket = this.newBucket.bind(this);
  }

  public render() {
    return (
      <div
        className={classNames(
          { root: !this.props.parentFolder },
          { folder: this.props.parentFolder },
          "new-bucket"
        )}
      >
        <input ref={this.inputRef} className="title" />
        <div className="create confirm" onClick={this.newBucket} />
      </div>
    );
  }

  private newBucket(event: any) {
    if (this.inputRef.current) {
      const parentName = this.parentName || "";
      const newName = this.inputRef.current.value;

      addBucket(newName, () => {
        if (this.props.parentFolder) {
          this.props.parentFolder.setState({ create: false });
        }
      });
    }
  }
}

export default Creator;
