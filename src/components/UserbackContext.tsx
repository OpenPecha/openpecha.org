// UserbackProvider.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import Userback from '@userback/widget';

const UserbackContext = createContext(null);
export const UserbackProvider = ({ children }) => {
  const [userback, setUserback] = useState(null);
  const token = import.meta.env.VITE_USERBACK_TOKEN;
  useEffect(() => {
    const init = async () => {
      const instance = await Userback(token);
      setUserback(instance);
    };

    init();
  }, []);

  return (
    <UserbackContext.Provider value={token}>
      {children}
    </UserbackContext.Provider>
  );
};

export const useUserback = () => useContext(UserbackContext);