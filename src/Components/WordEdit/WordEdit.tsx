import React from "react";
import { WordEntry } from "wordbucket";
import "./WordEdit.scss";

interface IWordEditState {
  value: string;
}

class WordEdit extends React.Component<{word: WordEntry}, IWordEditState> {
  private updateDebounce: any;
  private word: WordEntry;

  constructor(props: {word: WordEntry}) {
    super(props);
    this.state = {value: props.word.words};
    this.word = props.word;

    this.handleChange = this.handleChange.bind(this);
  }

  public handleChange(event: any) {
    const doUpdate = this.doUpdate.bind(this);
    this.setState({value: event.target.value});
    clearInterval(this.updateDebounce);
    this.updateDebounce = setTimeout(doUpdate, 300);
  }

  public render() {
    return(
      <input
        className="wordedit"
        value= {this.state.value}
        onChange= {this.handleChange}
      />
    );
  }

  private doUpdate() {
    this.word.update({words: this.state.value});
  }
}

export default WordEdit;
