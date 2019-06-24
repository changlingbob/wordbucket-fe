import Bucket, { WordEntry } from "wordbucket";

interface IUndoableProps {
  dispatch: () => void;
  redo: () => void;
  undo: () => void;
}

export class Undoable {
  public static undo = () => {
    if (Undoable.undoQueue.length > 0) {
      const memo = Undoable.undoQueue.pop();
      if (memo) {
        memo.undo();
        Undoable.redoQueue.push(memo);
      }
    }
  }

  public static redo = () => {
    if (Undoable.redoQueue.length > 0) {
      const memo = Undoable.redoQueue.pop();
      if (memo) {
        memo.redo();
        Undoable.undoQueue.push(memo);
      }
    }
  }
  private static undoQueue: Undoable[] = [];
  private static redoQueue: Undoable[] = [];
  public undo: () => void;
  public redo: () => void;
  public dispatch: () => void;

  constructor(memo: IUndoableProps) {
    this.undo = () => {memo.undo(); memo.dispatch(); };
    this.redo = () => {memo.redo(); memo.dispatch(); };
    this.dispatch = memo.dispatch;

    Undoable.undoQueue.push(this);
    this.redo();
    Undoable.redoQueue = [];
  }

}

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

export function addBucket(bucketName: string, parent: Bucket, dispatch: () => void) {
  const freshBucket = new Bucket(bucketName, parent);

  new Undoable({
    dispatch,
    redo: () => parent.addChild(freshBucket),
    undo: () => parent.removeChild(bucketName),
  });
}

export function removeBucket(bucket: Bucket, parent: Bucket, dispatch: () => void) {
  const bucketBackup = bucket;

  new Undoable({
    dispatch,
    redo: () => parent.removeChild(bucket),
    undo: () => parent.addChild(bucketBackup),
  });
}
