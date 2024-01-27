import * as React from 'react';

export interface AppState {
  state: boolean;
  setState: (newState: boolean) => void;
}

export const AppContext = React.createContext<AppState>({
  state: false,
  setState: () => {},
});

export const AppProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [state, setState] = React.useState(false);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};
