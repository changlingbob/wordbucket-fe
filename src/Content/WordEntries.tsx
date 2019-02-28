import React from "react";
import Bucket, { WordEntry } from "wordbucket";
import WordEdit from "../Components/WordEdit/WordEdit";
import { BucketState, INavigationState } from "../State/navigation";
import "./Content.scss";

const WordEntries = () => {
  return (
    <BucketState render={(state: INavigationState) => {
      const wordEntries: JSX.Element[] = [];
      const words: WordEntry[] = Bucket.get(state.path).getWords();

      for (const word of words) {
        wordEntries.push((<WordEdit key={word.words} word={word} />));
      }

      return (
        <div className="words">
          {wordEntries}
        </div>
      );
    }} />
  );
};

export default WordEntries;
