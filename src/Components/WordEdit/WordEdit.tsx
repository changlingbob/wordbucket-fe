import React from "react";
import { WordEntry } from "wordbucket";
import { updateWord } from "../../State/bucketmanager";
import "./WordEdit.scss";

interface IWordEditState {
  weight: number;
  words: string;
}

class WordEdit extends React.Component<{word: WordEntry}, IWordEditState> {
  private wordsDebounce: any;
  private weightDebounce: any;
  private word: WordEntry;

  constructor(props: {word: WordEntry}) {
    super(props);
    this.state = {
      weight: props.word.weight,
      words: props.word.words,
    };
    this.word = props.word;

    this.wordChange = this.wordChange.bind(this);
    this.weightChange = this.weightChange.bind(this);
  }

  public weightChange(event: any) {
    const doUpdate = this.doUpdate.bind(this);
    this.setState({weight: event.target.value});
    clearInterval(this.weightDebounce);
    this.weightDebounce = setTimeout(doUpdate, 300);
  }

  public wordChange(event: any) {
    const doUpdate = this.doUpdate.bind(this);
    this.setState({words: event.target.value});
    clearInterval(this.wordsDebounce);
    this.wordsDebounce = setTimeout(doUpdate, 300);
  }

  public render() {
    return(
      <div
        className="wordedit"
      >
        <input
          className="weight"
          value= {this.state.weight}
          onChange= {this.weightChange}
        />
        <input
          className="words"
          value= {this.state.words}
          onChange= {this.wordChange}
        />
      </div>
    );
  }

  private doUpdate() {
    updateWord(this.word, this.state.words, this.state.weight);
  }
}

export default WordEdit;
