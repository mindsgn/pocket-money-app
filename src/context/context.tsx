import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
} from 'react';

const StorageContext = createContext<any>(undefined);

function useStorage(): any {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error('useStorage must be used within an StorageProvider');
  }
  return context;
}

const StorageProvider = (props: { children: ReactNode }): ReactElement => {
  return <StorageContext.Provider {...props} value={{}} />;
};

export { StorageProvider, useStorage };
