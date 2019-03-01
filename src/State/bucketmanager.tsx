import Bucket, { WordEntry } from "wordbucket";

class Undoable {
  public undo: () => void;
  public redo: () => void;
  public location: string;

  // tslint:disable-next-line:no-shadowed-variable
  constructor({redo, undo}: {redo: () => void, undo: () => void}) {
    this.undo = undo;
    this.redo = redo;
    this.location = document.location.pathname;
  }
}

const undoQueue: any[] = [];
const redoQueue: any[] = [];

export function updateWord(word: WordEntry, words: string, weight: number) {
  const currentState = {words: word.words, weight: word.weight};
  const memo = new Undoable({
    redo: () => word.update({words, weight}),
    undo: () => word.update(currentState),
  });

  undoQueue.push(memo);
  memo.redo();
}

export function removeWord(word: WordEntry, bucket: Bucket) {
  const memo = new Undoable({
    redo: () => bucket.removeWords({word}),
    undo: () => bucket.putWords(word),
  });

  undoQueue.push(memo);
  memo.redo();
}

export function addWord(word: WordEntry, bucket: Bucket) {
  const memo = new Undoable({
    redo: () => bucket.putWords(word),
    undo: () => bucket.removeWords({word}),
  });

  undoQueue.push(memo);
  memo.redo();
}

export function undo() {
  if (undoQueue.length > 0) {
    const memo = undoQueue.pop();
    memo.undo();
    redoQueue.push(memo);
  }
}

export function redo() {
  if (redoQueue.length > 0) {
    const memo = redoQueue.pop();
    memo.redo();
    undoQueue.push(memo);
  }
}
