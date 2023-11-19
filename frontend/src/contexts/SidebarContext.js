import React, { createContext, useState, useEffect } from 'react';
export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(
    localStorage.getItem('userToken') || ''
  );
  const [userId, setUserId] = useState(
    localStorage.getItem('userId') || ''
  );

  useEffect(() => {
    localStorage.setItem('userToken', userToken);
    localStorage.setItem('userId', userId);
  }, [userToken, userId]);

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
