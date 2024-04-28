import React from 'react';
import Navbar from './components/Navbar';
import {createBrowserRouter, Link, RouterProvider, Outlet, NavLink} from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        {/* Autres composants et contenu de votre application */}
      </div>
    );
  }
}

/* import {createBrowserRouter, Link, RouterProvider, Outlet, NavLink} from 'react-router-dom'; */

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
        path: 'login',
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
/*
function App() {
  return <RouterProvider router={router}/>
}*/

export default App; 