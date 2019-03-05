import React from "react";
import { redo, undo } from "../../State/undomanager";
import "./Controls.scss";

const Controls = () => {
  return (
    <div className="controls">
      <div
        className="undo"
        onClick={undo}
        >Undo</div>
      <div
        className="redo"
        onClick={redo}
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
