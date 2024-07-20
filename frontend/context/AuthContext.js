import { createContext, useContext } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {user: action.playload}
        case 'LOGOUT':
            return {user: null}
        default:
            return state
    
    }
}

export const AuthContextProvider = ({ childern }) => {
    const [state, dispatch] = useReducer(authReducer,{
        user: null
    });
    console.log('Athcontext state', state);
    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            { childern }
        </AuthContext.Provider>
    )
}
