import React from "react";
import ResultBox from "../Components/ResultBox/ResultBox";
import "./Content.scss";
import WordEntries from "./WordEntries";

const Content = () => {
  return (
    <div className="content">
      <ResultBox />
      <WordEntries />
    </div>
  );
};

export default Content;
