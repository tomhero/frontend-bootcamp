import React from 'react';

const authContext = React.createContext({
    authenticated: false,
    login: () => {}
});
// const authContext = React.createContext([]);
// const authContext = React.createContext('');

export default authContext;