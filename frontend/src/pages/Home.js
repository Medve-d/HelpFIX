import { useEffect } from "react"
import { usePrestationsContext } from "../hooks/usePrestationsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import Homevid from "../components/videoHome"
import SearchBar from "../components/searchBar"
import Categories from "../components/Categories"
import PrestationFilter from "../components/PrestationFilter"


// components
import PrestationDetails from "../components/PrestationDetails"
import PrestationForm from "../components/PrestationForm"

const Home = () => {
  const { prestations, dispatch } = usePrestationsContext();
  const { user, role } = useAuthContext();

  useEffect(() => {
    const fetchPrestations = async () => {
      let endpoint = '/api/prestation';

      if (role === 'prestataire') {
        endpoint = '/api/prestation/myprestations';
      }

      const options = user
        ? { headers: { 'Authorization': `Bearer ${user.token}` } } 
        : {}; 

      const response = await fetch(endpoint, options);

      if (response.ok) {
        const json = await response.json();
        dispatch({ type: 'SET_PRESTATIONS', payload: json });
      }
    };

    fetchPrestations();
  }, [dispatch, user, role]);
  return (
    
    <div>
    <Homevid />
    {role === 'prestataire' ? (<h2 className="hometitles" >Vos Prestations</h2>  ) : (<h2 className="hometitles" >Nos Prestations</h2>  )}
    <SearchBar />
     <div className="home">
     {role !== 'prestataire' && (<PrestationFilter />) }
      <div className="workouts">
        {prestations && prestations.map(prestation => (
            <PrestationDetails prestation={prestation} key={prestation._id} />
        ))}
      </div>
      {role === 'prestataire' && (<PrestationForm />) }
      </div>
      {role !== 'prestataire' && (
        <>
          <h2 className="hometitles">Nos Catégories</h2>
          <Categories />
        </>
      )}
    </div>
  )
}

export default Home