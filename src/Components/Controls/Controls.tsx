import React from "react";
import { Undoable } from "../../State/undomanager";
import "./Controls.scss";

const Controls = () => {
  return (
    <div className="controls">
      <div
        className="undo"
        onClick={Undoable.undo}
        >Undo</div>
      <div
        className="redo"
        onClick={Undoable.redo}
      >Redo</div>
      <div>
        Import
      </div>
      <div>
        Export
      </div>
    </div>
  );
};

export default Controls;
