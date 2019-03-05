import Bucket, { WordEntry } from "wordbucket";

interface IUndoableProps {
  dispatch: () => void;
  redo: () => void;
  undo: () => void;
}

class Undoable {
  public undo: () => void;
  public redo: () => void;
  public dispatch: () => void;

  constructor(memo: IUndoableProps) {
    this.undo = () => {memo.undo(); memo.dispatch(); };
    this.redo = () => {memo.redo(); memo.dispatch(); };
    this.dispatch = memo.dispatch;

    undoQueue.push(this);
    this.redo();
    redoQueue = [];
  }
}

const undoQueue: any[] = [];
let redoQueue: any[] = [];

export function updateWord(word: WordEntry, words: string, weight: number, dispatch: () => void) {
  const currentState = {words: word.words, weight: word.weight};
  new Undoable({
    dispatch,
    redo: () => word.update({words, weight}),
    undo: () => word.update(currentState),
  });
}

export function removeWord(word: WordEntry, bucket: Bucket, dispatch: () => void) {
  new Undoable({
    dispatch,
    redo: () => bucket.removeWords({word}),
    undo: () => bucket.putWords(word),
  });
}

export function addWord(word: WordEntry, bucket: Bucket, dispatch: () => void) {
  new Undoable({
    dispatch,
    redo: () => bucket.putWords(word),
    undo: () => bucket.removeWords({word}),
  });
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
