// UserbackProvider.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import Userback from '@userback/widget';

const UserbackContext = createContext(null);

export const UserbackProvider = ({ children }) => {
  const [userback, setUserback] = useState(null);
  
  // Get token from environment variable
  const token = import.meta.env.VITE_USERBACK_TOKEN;
  
  // Fallback for development if env var not set
  const devToken = "A-JldUwSRlsuKf8Te85bql54w7U";
  const finalToken = token || devToken;

  useEffect(() => {
    if (!finalToken) {
      console.error('Userback token not found in environment variables');
      return;
    }

    const init = async () => {
      const instance = await Userback(finalToken);
      setUserback(instance);
    };

    init();
  }, [finalToken]);

  return (
    <UserbackContext.Provider value={userback}>
      {children}
    </UserbackContext.Provider>
  );
};

export const useUserback = () => useContext(UserbackContext);