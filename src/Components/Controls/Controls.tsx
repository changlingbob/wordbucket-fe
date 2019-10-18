import React from "react";
import { Undoable } from "../../State/undomanager";
import "./Controls.scss";
import PortPanel from "./PortPanel/PortPanel";

const Controls = () => {
  return (
    <div className="controls">
        {/* This className is magic! */}
        <div className="g-signin2">
          Login
        </div>
      <div className="app">
        <div
          className="undo button"
          onClick={Undoable.undo}
          >Undo</div>
        <div
          className="redo button"
          onClick={Undoable.redo}
          >Redo</div>
        <div
          className="import button"
        >
          Import
        </div>
        <div
          className="export button"
        >
          Export
        </div>
        <PortPanel
          content="this is my content hoorah"
          doneString="donezo"
          doneFunc={(details: string) => alert(details)}
        />
      </div>
    </div>
  );
};

export default Controls;
