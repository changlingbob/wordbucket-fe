import React from "react";
import { Word, WordManager } from "wordbucket";
import WordEdit from "../Components/WordEdit/WordEdit";
import { BucketState, IApplicationState } from "../State/state";
import "./Content.scss";

const WordEntries = () => {
  return (
    <BucketState
      render={(state: IApplicationState | null) => {
        if (!state) {
          return <>hello</>;
        }

        if (state.path === "" || !!!WordManager.check(state.path)) {
          return null;
        }
        const bucket = WordManager.fetch(state.path);

        if (!bucket && state.path.indexOf(".") > -1) {
          state.navigate(state.path.slice(0, state.path.lastIndexOf(".")));
        } else if (!bucket) {
          state.navigate("");
        } else {
          const wordEntries: JSX.Element[] = [];
          const words: Word[] = bucket.getWords();

          for (const word of words) {
            wordEntries.push(
              <WordEdit
                key={`${word.weight}::${word.words}`}
                word={word}
                bucket={bucket}
                navigate={() => state.navigate(state.path)}
              />
            );
          }

          wordEntries.push(
            <WordEdit
              key={`${Math.random()}`}
              bucket={bucket}
              navigate={() => state.navigate(state.path)}
              create={true}
            />
          );

          return <div className="words">{wordEntries}</div>;
        }
      }}
    />
  );
};

export default WordEntries;
