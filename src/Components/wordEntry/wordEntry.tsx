import * as React from 'react';

import { Button } from '@components/button/button';
import { DebugState } from '@state/debugger';
import { Word } from 'wordbucket';

import styles from './wordEntry.module.scss';
import classNames from 'classnames';

export interface IWordEntryProps {
  word: Word;
  className?: string;
}

export const WordEntry: React.FC<IWordEntryProps> = ({ word, className }) => {
  const words = word.words.split(' ');
  const { keys } = React.useContext(DebugState);

  return (
    <div className={classNames(className, styles.content)}>
      <div className={styles.values}>
        {words.map((value, index) => (
          <span key={index}>{value} </span>
        ))}
      </div>
      <Button className={styles.edit} onClick={console.log}>
        Edit
      </Button>
    </div>
  );
};
