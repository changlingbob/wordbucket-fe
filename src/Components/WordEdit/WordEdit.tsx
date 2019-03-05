import React from "react";
import Bucket, { WordEntry } from "wordbucket";
import { BucketState, IApplicationState } from "../../State/state";
import { removeWord, updateWord } from "../../State/undomanager";
import "./WordEdit.scss";

interface IWordEditState {
  weight: number;
  words: string;
}

interface IWordEditProps {
  bucket: Bucket;
  navigate: () => void;
  word: WordEntry;
}

class WordEdit extends React.Component<IWordEditProps, IWordEditState> {
  private wordsDebounce: any;
  private weightDebounce: any;
  private word: WordEntry;
  private bucket: Bucket;
  private navigate: () => void;

  constructor(props: IWordEditProps) {
    super(props);
    this.state = {
      weight: props.word.weight,
      words: props.word.words,
    };
    this.word = props.word;
    this.bucket = props.bucket;
    this.navigate = props.navigate;

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
    removeWord(this.word, this.bucket, this.navigate);
  }

  private doUpdate() {
    updateWord(this.word, this.state.words, this.state.weight, this.navigate);
  }
}

export default WordEdit;
