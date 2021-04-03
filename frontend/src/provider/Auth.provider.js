import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [signedIn, setSignin] = useState(false);
    const [graphqlUrl, setGraphqlUrl] = useState('http://localhost:8080/');

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            let user = localStorage.getItem('user');
            setUser(JSON.parse(user));
            setSignin(true);
        }
    }, []);

    const login = async ({ user, token }) => {
        setUser(user);
        setSignin(true);
        storeUserDetailsAndToken(user, token);
    };

    const logout = async () => {
        setUser(null);
        setSignin(false);
        localStorage.clear();
    };

    const storeUserDetailsAndToken = async (user, token) => {
        localStorage.setItem('accessToken', token.access.token);
        localStorage.setItem('refreshToken', token.refresh.token);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const refreshToken = async () => {
        //
    };

    const isLoggedIn = () => {
        return localStorage.getItem('accessToken') === null;
    };

    return {
        user,
        signedIn,
        graphqlUrl,
        isLoggedIn,
        setGraphqlUrl,
        login,
        refreshToken,
        logout,
    };
}

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
