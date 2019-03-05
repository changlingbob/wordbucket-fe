import React from "react";
import Bucket, { WordEntry } from "wordbucket";
import WordEdit from "../Components/WordEdit/WordEdit";
import { BucketState, IApplicationState } from "../State/state";
import "./Content.scss";

const WordEntries = () => {
  return (
    <BucketState render={(state: IApplicationState) => {
      const wordEntries: JSX.Element[] = [];
      const bucket = Bucket.get(state.path);
      const words: WordEntry[] = bucket.getWords();

      for (const word of words) {
        wordEntries.push((<WordEdit
          key={`${word.weight}::${word.words}`}
          word={word}
          bucket={bucket}
          navigate={() => state.navigate(state.path)}
        />));
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
