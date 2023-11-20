import React, {createContext, useState, useEffect} from 'react';

export const SidebarContext = createContext();

export const SidebarProvider = ({children}) => {
    const [userToken, setUserToken] = useState(
        localStorage.getItem('userToken') || ''
    );
    const [userId, setUserId] = useState(
        localStorage.getItem('userId') || ''
    );
    const [email, setEmail] = useState(
        localStorage.getItem('email') || ''
    );

    useEffect(() => {
        localStorage.setItem('userToken', userToken);
        localStorage.setItem('userId', userId);
        localStorage.setItem('email', email);
    }, [userToken, userId, email]);

    const updateUser = (newToken, newUserId, newEmail) => {
        setUserToken(newToken);
        setUserId(newUserId);
        setEmail(newEmail);
    };

    return (
        <SidebarContext.Provider value={{userToken, userId, updateUser}}>
            {children}
        </SidebarContext.Provider>
    );
};
