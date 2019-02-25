import React from "react";
import Bucket from "wordbucket";
import Folder from "../Components/Folder/Folder";
import { BucketState, INavigationState } from "../State/navigation";

export default function SideBar() {
  return (
    <BucketState
      render={(state: INavigationState) => {
        const container = (
          <div
            className ="sidebar"
          >
            <Folder
              state={state}
              collapsed={false}
            />
          </div>
        );

        return container;
      }}
    />
  );
}
