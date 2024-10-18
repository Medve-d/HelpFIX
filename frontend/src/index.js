import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PrestationsContextProvider } from './context/PrestationsContext';
import { DemandesContextProvider } from './context/DemandesContext';
import { ProfileContextProvider } from './context/profilesContext';
import { AuthContextProvider  } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PrestationsContextProvider>
      <ProfileContextProvider>
         <DemandesContextProvider>
          <App />
        </DemandesContextProvider>
      </ProfileContextProvider>
    </PrestationsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)