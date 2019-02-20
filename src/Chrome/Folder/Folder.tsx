import classNames from "classnames";
import React from "react";
import Bucket from "wordbucket";
import { INavigationState, NavLink } from "../../State/navigation";
import "./Folder.scss";

const Folder = ({state}: {state: INavigationState}) => {
  const bucket = state.bucket;
  const children = [];
  for (const child of bucket.getChildren()) {
    children.push(<Folder state={{...state, bucket: child}} />);
  }

  return (
    <div
      className={classNames(
        "folder",
        {collapsed: state.inPath(bucket.getName())},
      )}
    >
      <NavLink
        className="title"
        path={bucket.getName()}
      >
        {bucket.getName()}
      </NavLink>
      <div className="children">
        {children}
      </div>
    </div>
  );
};

export default Folder;
