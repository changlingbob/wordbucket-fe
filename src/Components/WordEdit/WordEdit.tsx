import React from "react";
import Bucket, { WordEntry } from "wordbucket";
import { removeWord, updateWord } from "../../State/undomanager";
import "./WordEdit.scss";

interface IWordEditState {
  weight: number;
  words: string;
}

class WordEdit extends React.Component<{bucket: Bucket, word: WordEntry, rerender: () => void}, IWordEditState> {
  private wordsDebounce: any;
  private weightDebounce: any;
  private word: WordEntry;
  private bucket: Bucket;
  private rerender: () => void;

  constructor(props: {bucket: Bucket, word: WordEntry, rerender: () => void}) {
    super(props);
    this.state = {
      weight: props.word.weight,
      words: props.word.words,
    };
    this.word = props.word;
    this.bucket = props.bucket;
    this.rerender = props.rerender;

    this.wordChange = this.wordChange.bind(this);
    this.weightChange = this.weightChange.bind(this);
    this.removeWord = this.removeWord.bind(this);
  }

  public render() {
    return(
      <div
        className="wordedit"
      >
        <input
          className="weight"
          value={this.state.weight}
          onChange={this.weightChange}
        />
        <input
          className="words"
          value={this.state.words}
          onChange={this.wordChange}
        />
        <div
          className="delete"
          onClick={this.removeWord}
        />
      </div>
    );
  }

  private weightChange(event: any) {
    const doUpdate = this.doUpdate.bind(this);
    this.setState({weight: event.target.value});
    clearInterval(this.weightDebounce);
    this.weightDebounce = setTimeout(doUpdate, 300);
  }

  private wordChange(event: any) {
    const doUpdate = this.doUpdate.bind(this);
    this.setState({words: event.target.value});
    clearInterval(this.wordsDebounce);
    this.wordsDebounce = setTimeout(doUpdate, 300);
  }

  private removeWord() {
    removeWord(this.word, this.bucket);
    this.rerender();
  }

  private doUpdate() {
    updateWord(this.word, this.state.words, this.state.weight);
  }
}

export default WordEdit;
