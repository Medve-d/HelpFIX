// ProfileContext.js
import { createContext, useReducer } from 'react';

export const ProfileContext = createContext();

const profileReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PROFILE':
      return { user: action.payload };
    case 'UPDATE_PROFILE':
      return { user: { ...state.user, ...action.payload } };
    default:
      return state;
  }
};

export const ProfileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, { user: null });

  return (
    <ProfileContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};
