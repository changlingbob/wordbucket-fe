import React from "react";
import Bucket from "wordbucket";
import { BucketState, INavigationState } from "../State/navigation";
import Folder from "./Folder/Folder";

export default function SideBar() {
  return (
    <BucketState
      render={(state: INavigationState) => {
        return (
          <div
            className="sidebar"
          >
            <Folder
              state={state}
            />
          </div>
        );
      }}
    />
  );
}
