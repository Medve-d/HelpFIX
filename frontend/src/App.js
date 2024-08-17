import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/userProfile'
import DemandePage from './pages/demandePage'
import Navbar from './components/Navbar'

function App() {


  const { user } = useAuthContext() 

  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element= <Home />
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
            <Route 
              path="/profile" 
              element= <Profile />
            />
            <Route
              path="/prestation/:id" 
              element={<DemandePage />} 
            /> 

            
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
