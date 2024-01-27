import React from 'react';

import styles from './button.module.scss';

export interface IButtonProps {
  color?: string;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: React.FC<React.PropsWithChildren<IButtonProps>> = ({
  onClick,
  color,
  children,
  disabled = false,
  ...rest
}) => (
  <button
    className={styles.button}
    style={{ '--color': color } as React.CSSProperties}
    data-disabled={disabled}
    onClick={() => !disabled && onClick()}
    {...rest}
  >
    <div className={styles.label}>{children}</div>
  </button>
);
