import { View, Text } from 'react-native'
import { React, createContext, useEffect, useState } from 'react'
import AsyncStore from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: (token) => { },
    logout: () => { },
});

function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState();

    useEffect(() => {
        async function fetchToken() {
            const storedToken = await AsyncStore.getItem('token');

            if (storedToken) {
                setAuthToken(storedToken);
            }
        }
        fetchToken();
    }, []);

    function authenticate(token) {
        setAuthToken(token);
        AsyncStore.setItem('token', token);
    }

    function logout() {
        setAuthToken(null);
        AsyncStore.removeItem('token');
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;
