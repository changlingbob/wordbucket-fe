import React from "react";
import { WordEntry } from "wordbucket";

const WordEdit = ({word}: {word: WordEntry}) => {
  return (
    <div>{word.words}</div>
  );
};

export default WordEdit;
