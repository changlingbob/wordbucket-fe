import classNames from "classnames";
import React from "react";
import Bucket, { WordEntry } from "wordbucket";
import { addWord, removeWord, updateWord } from "../../State/undomanager";
import "./WordEdit.scss";

interface IWordEditState {
  create: boolean;
  weight: number;
  words: string;
}

interface IWordEditProps {
  bucket: Bucket;
  navigate: () => void;
  create?: boolean;
  word?: WordEntry;
}

class WordEdit extends React.Component<IWordEditProps, IWordEditState> {
  private wordsDebounce: any;
  private weightDebounce: any;
  private word: WordEntry|undefined;
  private bucket: Bucket;
  private navigate: () => void;

  constructor(props: IWordEditProps) {
    super(props);
    this.state = {
      create: props.create || false,
      weight: props.word ? props.word.weight : 0,
      words: props.word ? props.word.words : "",
    };
    this.word = props.word;
    this.bucket = props.bucket;
    this.navigate = props.navigate;

    this.wordChange = this.wordChange.bind(this);
    this.weightChange = this.weightChange.bind(this);
    this.updateWord = this.updateWord.bind(this);
  }

  public render() {
    return(
      <div
        className={classNames(
          "wordedit",
          {create: this.state.create},
        )}
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
          className="button"
          onClick={this.updateWord}
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

  private updateWord() {
    if (this.state.create) {
      this.setState({create: false});
    } else if (this.word) {
      removeWord(this.word, this.bucket, this.navigate);
    } else {
      this.setState({
        create: true,
        weight: 0,
        words: "",
      });
    }
  }

  private doUpdate() {
    if (!this.word && this.state.words && this.state.weight) {
      this.word = new WordEntry(this.state.words, +this.state.weight, this.bucket);
      addWord(this.word, this.bucket, this.navigate);
    } else if (this.word) {
      updateWord(this.word, this.state.words, +this.state.weight, this.navigate);
    }
  }
}

export default WordEdit;
