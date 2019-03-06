import React from "react";
import Bucket from "wordbucket";
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
      self.setState({resizeMode: false});
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
        render={(state: IApplicationState) => {
          const container = (
            <div
              className ="sidebar"
              onPointerDown={dragStart}
              onPointerUp={cancelDrag}
              style={{width: self.state.width}}
            >
              <Folder
                bucket={state.bucket}
                inPath={state.inPath}
                path={state.path}
                collapsed={false}
              />
            </div>
          );

          return container;
        }}
      />
    );
  }
}

export default SideBar;
