import React from "react";
import Wordbucket, { Bucket, Word } from "wordbucket";
import WordEdit from "../Components/WordEdit/WordEdit";
import { BucketState, IApplicationState } from "../State/state";
import "./Content.scss";

const WordEntries = () => {
  return (
    <BucketState render={(state: IApplicationState) => {
      if (state.path === "" || !!!Wordbucket.check(state.path)) {
        console.log("none");
        return null;
      }
      const bucket = Wordbucket.fetch(state.path);
      console.log(state.path);
      if (!bucket && state.path.indexOf(".") > -1) {
        console.log("got a dot");
        state.navigate(state.path.slice(0, state.path.lastIndexOf(".")));
      } else if (!bucket) {
        console.log("no bucket");
        state.navigate("");
      } else {
        console.log("bucket!");
        const wordEntries: JSX.Element[] = [];
        const words: Word[] = bucket.getWords();

        for (const word of words) {
          wordEntries.push((<WordEdit
            key={`${word.weight}::${word.words}`}
            word={word}
            bucket={bucket}
            navigate={() => state.navigate(state.path)}
            />));
          }

        wordEntries.push((<WordEdit
            key={`${Math.random()}`}
            bucket={bucket}
            navigate={() => state.navigate(state.path)}
            create={true}
        />));

        return (
          <div className="words">
            {wordEntries}
          </div>
        );
      }
    }} />
  );
};

export default WordEntries;
