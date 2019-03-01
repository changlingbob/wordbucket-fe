import { WordEntry } from "wordbucket";

interface IUndoable {
  location: string;
  undo: () => void;
  redo: () => void;
}

const undoQueue: any[] = [];
const redoQueue: any[] = [];

export function updateWord(word: WordEntry, words: string, weight: number) {
  const currentState = {words: word.words, weight: word.weight};
  const memo: IUndoable = {
    location: document.location.pathname,
    redo: () => word.update({words, weight}),
    undo: () => word.update(currentState),
  };

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
