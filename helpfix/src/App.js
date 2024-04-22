import './App.css';
import {createBrowserRouter, Link, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Page d'accueil
      <nav>
        <Link to ="/">Accueil</Link>
        <Link to ="/blog">Blog</Link>
        <Link to ="/contact">Contact</Link>
      </nav>
    </div>,
    
  },
  {
    path: "/blog",
    element: <div>Bienvenue sur le blog
      <nav>
        <Link to ="/">Accueil</Link>
        <Link to ="/blog">Blog</Link>
        <Link to ="/contact">Contact</Link>
      </nav>
    </div>,
  },
  {
    path: "/contact",
    element: <div>Bienvenue sur la page contact
      <nav>
        <Link to ="/">Accueil</Link>
        <Link to ="/blog">Blog</Link>
        <Link to ="/contact">Contact</Link>
      </nav>
    </div>,
  },
]);

function App() {
  return <RouterProvider router={router}/>
}

export default App;