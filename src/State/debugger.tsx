import * as React from 'react';

export interface IDebugState {
  add: (key: string, value: string) => void;
  clear: (key: string) => void;
  keys: { [key: string]: string };
}

export const DebugState = React.createContext<IDebugState>({} as IDebugState);

export const DebugProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, setState] = React.useState<{ [key: string]: string }>({});

  const add = (key: string, value: string) => {
    setState({ ...state, [key]: value });
  };

  const clear = (key: string) => {
    const newState = { ...state };
    delete newState[key];

    setState(newState);
  };

  return (
    <DebugState.Provider value={{ add, clear, keys: state }}>
      {children}
    </DebugState.Provider>
  );
};
