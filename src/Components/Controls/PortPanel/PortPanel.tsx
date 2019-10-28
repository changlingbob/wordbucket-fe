import React from "react";
import "./PortPanel.scss";

export interface IPanelProps {
  content: string;
  doneString: string;
  doneFunc: (details: string) => void;
}

const Panel = (props: IPanelProps) => {
  let inputRef: any;
  const doneClicked = () => {
    props.doneFunc(inputRef.value);
  };

  return (
    <div className="floating-panel">
      <textarea
        ref={(el) => inputRef = el}
      >
        {props.content}
      </textarea>
      <div
        className="button"
        onClick={doneClicked}>
        {props.doneString}
      </div>
    </div>
  );
};

export default Panel;
