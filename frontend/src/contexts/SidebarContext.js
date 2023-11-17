import React, { createContext, useState } from 'react';
export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [userToken, setUserToken] = useState('');
  const [userId, setUserId] = useState('');

  const updateUser = (newToken, newUserId) => {
    setUserToken(newToken);
    setUserId(newUserId);
  };

  return (
    <SidebarContext.Provider value={{ userToken, userId, updateUser }}>
      {children}
    </SidebarContext.Provider>
  );
};
