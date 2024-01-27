/* eslint-disable no-new -- we're doing undo magic */
import { Bucket, Word, WordManager } from 'wordbucket';

interface IUndoableProps {
  dispatch?: () => void;
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
    Undoable.startSave();
  };

  public static redo = () => {
    if (Undoable.redoQueue.length > 0) {
      const memo = Undoable.redoQueue.pop();
      if (memo) {
        memo.redo();
        Undoable.undoQueue.push(memo);
      }
    }
    Undoable.startSave();
  };

  public static setSave(save: () => void) {
    window.addEventListener('beforeunload', (e) => {
      if (Undoable.saveOutstanding) {
        Undoable.save();
        e.preventDefault();
        e.returnValue = 'save in progress';
      }
    });
    Undoable.save = save;
  }

  private static saveOutstanding: boolean = false;
  private static save: () => void;

  private static undoQueue: Undoable[] = [];
  private static redoQueue: Undoable[] = [];
  private static debounce: NodeJS.Timeout;
  private static debounceTime: number = 5000;

  private static startSave() {
    Undoable.saveOutstanding = true;
    if (Undoable.debounce) {
      clearTimeout(Undoable.debounce);
    }
    Undoable.debounce = setTimeout(() => {
      Undoable.saveOutstanding = false;
      Undoable.save();
    }, Undoable.debounceTime);
  }

  public undo: () => void;
  public redo: () => void;
  public dispatch?: () => void;

  constructor(memo: IUndoableProps) {
    this.undo = () => {
      memo.undo();
      if (memo.dispatch) {
        memo.dispatch();
      }
    };
    this.redo = () => {
      memo.redo();
      if (memo.dispatch) {
        memo.dispatch();
      }
    };
    this.dispatch = memo.dispatch;

    Undoable.undoQueue.push(this);
    this.redo();
    Undoable.redoQueue = [];
    Undoable.startSave();
  }
}

// Words

export function updateWord(
  word: Word,
  words: string,
  weight: number,
  dispatch?: () => void
) {
  const currentState = { words: word.words, weight: word.weight };
  new Undoable({
    dispatch,
    redo: () => word.update({ words, weight }),
    undo: () => word.update(currentState),
  });
}

export function removeWord(word: Word, bucket: Bucket, dispatch?: () => void) {
  new Undoable({
    dispatch,
    redo: () => bucket.remove(word),
    undo: () => bucket.add(word.words, word.weight),
  });
}

export function addWord(word: Word, bucket: Bucket, dispatch?: () => void) {
  new Undoable({
    dispatch,
    redo: () => bucket.add(word.words, word.weight),
    undo: () => bucket.remove(word),
  });
}

// Buckets

export function addBucket(bucketName: string, dispatch: () => void) {
  const freshBucket = new Bucket(bucketName);

  new Undoable({
    dispatch,
    redo: () => WordManager.attach(freshBucket),
    undo: () => {
      WordManager.detach(freshBucket);
    },
  });
}

export function removeBucket(bucket: Bucket, dispatch: () => void) {
  const bucketBackup = bucket;

  new Undoable({
    dispatch,
    redo: () => WordManager.detach(bucket),
    undo: () => WordManager.attach(bucketBackup),
  });
}
/* eslint-enable no-new -- we're doing undo magic */
