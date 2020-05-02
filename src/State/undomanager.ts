import Wordbucket, { Bucket, Word } from "wordbucket";

interface IUndoableProps {
  dispatch: () => void;
  redo: () => void;
  undo: () => void;
}

export class Undoable {
  public static wordbucket: typeof Wordbucket;
  public static setRoot = (root: typeof Wordbucket) => {
    Undoable.wordbucket = root;
  }

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

// Words

export function updateWord(word: Word, words: string, weight: number, dispatch: () => void) {
  const currentState = {words: word.words, weight: word.weight};
  new Undoable({
    dispatch,
    redo: () => word.update({words, weight}),
    undo: () => word.update(currentState),
  });
}

export function removeWord(word: Word, bucket: Bucket, dispatch: () => void) {
  new Undoable({
    dispatch,
    redo: () => bucket.remove(word),
    undo: () => bucket.add(word.words, word.weight),
  });
}

export function addWord(word: Word, bucket: Bucket, dispatch: () => void) {
  new Undoable({
    dispatch,
    redo: () => bucket.add(word.words, word.weight),
    undo: () => bucket.remove(word),
  });
}

// Buckets

export function addBucket(bucketName: string, parentName: string, dispatch: () => void) {
  let attachFunc: (bucket: Bucket) => void;
  let detachFunc: (bucket: Bucket) => void;
  if (parentName && Wordbucket.check(parentName)) {
    const bucket = Wordbucket.fetch(parentName);
    attachFunc = bucket.attach;
    detachFunc = bucket.detach;
  } else {
    attachFunc = Wordbucket.attach;
    detachFunc = Wordbucket.detach;
  }

  const freshBucket = new Bucket(bucketName);

  new Undoable({
    dispatch,
    redo: () => attachFunc(freshBucket),
    undo: () => {
      detachFunc(freshBucket);
    },
  });
}

export function removeBucket(bucket: Bucket, parent: Bucket, dispatch: () => void) {
  const bucketBackup = bucket;

  new Undoable({
    dispatch,
    redo: () => parent.detach(bucket),
    undo: () => parent.attach(bucketBackup),
  });
}
