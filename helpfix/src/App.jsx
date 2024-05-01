import React from 'react';
import Navbar from './components/Navbar';
import {createBrowserRouter, Outlet, NavLink} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


/* import {createBrowserRouter, Link, RouterProvider, Outlet, NavLink} from 'react-router-dom'; */


/*class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
      </div>
    );
  }
} */

const router = createBrowserRouter ([
  {
    path : '/',
    element: <Root/>,
    errorElement: <PageError/>,
    children: [
      {
        path: 'signin',
        element: <div>S'inscrire</div>,
      },
      {
        path: 'loginPage',
        element: <div>Se connecter</div>,
      },
    ]
  }
]);

function PageError() {
  const error = PageError();
  console.log(error)
  return <>
    <h1>Une erreur est survenue</h1>
  </>
}

function Root () {
  return <>
    <header>
      <nav>
        <NavLink to="/">Accueil</NavLink>
        <NavLink to="/signin">S'inscrire</NavLink>
        <NavLink to="/login">Se connecter</NavLink>
      </nav>
    </header>
    <div className='container my-4'>
      <Outlet/>
    </div>
  </>
}
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


export default App; 