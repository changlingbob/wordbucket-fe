import React from "react";
import Bucket from "wordbucket";
import Folder from "../Components/Folder/Folder";
import { BucketState, INavigationState } from "../State/navigation";

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
      width: 200,
    };
  }

  public render() {
    const self = this;

    function dragStart(ev: React.MouseEvent<HTMLDivElement>) {
      if (ev.nativeEvent.offsetX > self.state.width - 10) {
        document.body.addEventListener("pointermove", dragMove);
        self.setState({
          lastDragX: ev.pageX,
          resizeMode: true,
        });
      }
    }

    function cancelDrag(ev: React.MouseEvent<HTMLDivElement>) {
      document.body.removeEventListener("pointermove", dragMove);
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
        render={(state: INavigationState) => {
          const container = (
            <div
              className ="sidebar"
              onPointerDown={dragStart}
              onPointerUp={cancelDrag}
              style={{width: self.state.width}}
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
}

export default SideBar;
