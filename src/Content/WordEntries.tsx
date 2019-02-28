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
        wordEntries.push((<WordEdit word={word} />));
      }

      return (
        <div className="word-entries">
          {wordEntries}
        </div>
      );
    }} />
  );
};

export default WordEntries;
