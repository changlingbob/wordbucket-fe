import * as React from 'react';

import { Button } from '@components/button/button';
import { DebugState } from '@state/debugger';
import { Word } from 'wordbucket';

import styles from './wordEdit.module.scss';
import classNames from 'classnames';

export interface IWordEditProps {
  word: Word;
  className?: string;
}

export const WordEdit: React.FC<IWordEditProps> = ({ word, className }) => {
  const words = word.words.split(' ');
  const { keys } = React.useContext(DebugState);

  return (
    <div className={classNames(className, styles.content)}>
      <input className={styles.words} value={word.words} />
      <input className={styles.weight} value={word.weight} />
      <div className={styles.values}>
        {words.map((value, index) => (
          <span key={index}>{value} </span>
        ))}
      </div>
      <Button className={styles.save} onClick={console.log}>
        Save
      </Button>
    </div>
  );
};
