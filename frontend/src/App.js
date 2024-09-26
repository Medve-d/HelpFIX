import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Navbar from './components/navbar/Navbar';
import Footer from './components/footComp';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SignupPrstatire from './pages/SignupPrstatire';
import Profile from './pages/userProfile';
import DemandePage from './pages/demandePage';
import MesDemandes from './pages/mesDemandes';
import TextChat from './pages/testchat';
import Blog from './pages/about';
import CategoriesPage from './pages/CategoriesPage';
import CatP from './pages/categories/catP';
import CatT from './pages/categories/catT';
import CatJ from './pages/categories/catJ';
import CatR from './pages/categories/catR';
import CatN from './pages/categories/catN';
import CatD from './pages/categories/catD';
import ContactUs from './pages/contactUs';
import Memberships from './pages/memberships';
import MembershipsPaiment from './pages/membershipsPaiment';
import MembershipWrapper from './HOC/membershipWrapper';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
            <Route path="/singuppro" element={!user ? <SignupPrstatire /> : <Navigate to="/" />} />

            <Route 
              path="/" 
                element={
                <MembershipWrapper>
                  <Home />
                </MembershipWrapper>
              } 
            />
            <Route 
              path="/prestation/:id" 
              element={
                <MembershipWrapper>
                  <DemandePage />
                </MembershipWrapper>
              } 
            />
            <Route 
              path="/mesdemandes" 
              element={
                <MembershipWrapper>
                  <MesDemandes />
                </MembershipWrapper>
              } 
            />

            {/* Other routes */}
            <Route path="/aboutus" element={<Blog />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/plumbers" element={<CatP />} />
            <Route path="/categories/menage" element={<CatN />} />
            <Route path="/categories/reparation" element={<CatR />} />
            <Route path="/categories/jardinage" element={<CatJ />} />
            <Route path="/categories/demenagment" element={<CatD />} />
            <Route path="/categories/tuto" element={<CatT />} />
            <Route path="/testchat" element={<TextChat />} />
            <Route path="/memberships" element={<Memberships />} />
            <Route path="/profile" element={<Profile />}/>
            <Route path="/membershipspaiment" element={<MembershipsPaiment />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
