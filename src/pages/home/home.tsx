import * as React from 'react';

import { Button } from '@components/button/button';

import styles from './home.module.scss';

export interface IHomeProps {}

export const Home: React.FC<IHomeProps> = () => (
  <div className={styles.content}>
    <p>Hello world</p>
    <Button onClick={() => alert(0)}>Useless button</Button>
  </div>
);
