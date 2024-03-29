import React from "react";
import { WordManager } from "wordbucket";
import Creator from "../Components/Folder/Creator";
import Folder from "../Components/Folder/Folder";
import { BucketState, IApplicationState } from "../State/state";

interface ISideBarState {
  width: number;
  resizeMode: boolean;
  lastDragX: number;
}

class SideBar extends React.Component<any, ISideBarState> {
  constructor(props: any) {
    super(props);
    this.state = {
      lastDragX: 0,
      resizeMode: false,
      width: 275,
    };
  }

  public render() {
    const self = this;

    function dragStart(ev: React.MouseEvent<HTMLDivElement>) {
      if (ev.nativeEvent.offsetX > self.state.width - 10) {
        document.body.addEventListener("pointermove", dragMove);
        document.body.addEventListener("pointerleave", cancelDrag);
        self.setState({
          lastDragX: ev.pageX,
          resizeMode: true,
        });
      }
    }

    function cancelDrag(ev: any) {
      document.body.removeEventListener("pointermove", dragMove);
      document.body.removeEventListener("pointerleave", cancelDrag);
      self.setState({ resizeMode: false });
    }

    function dragMove(this: HTMLElement, ev: PointerEvent) {
      if (self.state.resizeMode && ev.movementX !== 0) {
        self.setState({
          lastDragX: ev.pageX,
          width: self.state.width + (ev.pageX - self.state.lastDragX),
        });
      }
    }

    return (
      <BucketState
        render={(state: IApplicationState | null) => {
          const bucketElements = state
            ? WordManager.getBuckets()
                .filter((bucket) => {
                  return !bucket.title.match(/\./);
                })
                .map((bucket) => {
                  return (
                    <Folder
                      bucket={bucket}
                      create={false}
                      collapsed={false}
                      inPath={state.inPath}
                      path={state.path}
                      parentName=""
                    />
                  );
                })
            : [];

          bucketElements.push(<Creator parentName="" />);

          const container = (
            <div
              className="sidebar"
              onPointerDown={dragStart}
              onPointerUp={cancelDrag}
              style={{ width: self.state.width }}
            >
              {bucketElements}
            </div>
          );

          return container;
        }}
      />
    );
  }
}

export default SideBar;
