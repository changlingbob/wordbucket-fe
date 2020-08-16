import classNames from "classnames";
import React from "react";
import { Bucket, Word } from "wordbucket";
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
  word?: Word;
}

class WordEdit extends React.Component<IWordEditProps, IWordEditState> {
  private updateDebounce: any;
  private word: Word|undefined;
  private bucket: Bucket;
  private navigate: () => void;
  private debounceLength = 2500;

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
          defaultValue={this.state.weight}
          onChange={this.weightChange(false)}
          onBlur={this.weightChange(true)}
        />
        <input
          className="words"
          defaultValue={this.state.words}
          onChange={this.wordChange(false)}
          onBlur={this.wordChange(true)}
        />
        <div
          className="button"
          onClick={this.updateWord}
        />
      </div>
    );
  }

  private weightChange(immediate: boolean) {
    return (event: any) => {
      if (this.word?.weight !== event.target.value) {
        const doUpdate = this.doUpdate.bind(this);
        this.setState({weight: event.target.value});
        if (immediate) {
          clearInterval(this.updateDebounce);
          doUpdate();
        } else {
          clearInterval(this.updateDebounce);
          this.updateDebounce = setTimeout(doUpdate, this.debounceLength);
        }
      }
    };
  }

  private wordChange(immediate: boolean) {
    return (event: any) => {
      if (this.word?.words !== event.target.value) {
        const doUpdate = this.doUpdate.bind(this);
        this.setState({words: event.target.value});
        if (immediate) {
          clearInterval(this.updateDebounce);
          doUpdate();
        } else {
          clearInterval(this.updateDebounce);
          this.updateDebounce = setTimeout(doUpdate, this.debounceLength);
        }
      }
    };
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
    if (!this.word) {
      this.word = new Word(this.state.words || "", +this.state.weight);
      addWord(this.word, this.bucket, this.navigate);
      this.setState({create: false});
    } else if (this.word) {
      updateWord(this.word, this.state.words, +this.state.weight);
    }
  }
}

export default WordEdit;
