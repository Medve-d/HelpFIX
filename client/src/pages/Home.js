import { useEffect, useState } from "react";
import { usePrestationsContext } from "../hooks/usePrestationsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Homevid from "../components/videoHome";
import SearchBar from "../components/searchBar";
import Categories from "../components/Categories";
import PrestationFilter from "../components/PrestationFilter";

// Components
import PrestationDetails from "../components/PrestationDetails";
import PrestationForm from "../components/PrestationForm";

const Home = () => {
  const { prestations, dispatch } = usePrestationsContext();
  const { user, role } = useAuthContext();
  const [filteredPrestations, setFilteredPrestations] = useState([]);

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
        let json = await response.json();

        // Triez les prestations par date décroissante pour obtenir les plus récentes
        json.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Limitez le nombre de prestations à 5
        const recentPrestations = json.slice(0, 5);

        dispatch({ type: 'SET_PRESTATIONS', payload: recentPrestations });
        setFilteredPrestations(recentPrestations);
      }
    };

    fetchPrestations();
  }, [dispatch, user, role]);

  const handleFilter = (filters) => {
    let results = prestations || [];

    if (filters.category) {
      results = results.filter(p => p.category === filters.category);
    }
    if (filters.ville) {
      results = results.filter(p => p.ville === filters.ville);
    }
    if (filters.priceRange) {
      if (filters.priceRange === '100+') {
        results = results.filter(p => p.price >= 100);
      } else {
        const [min, max] = filters.priceRange.split('-').map(Number);
        results = results.filter(p => p.price >= min && p.price <= max);
      }
    }

    setFilteredPrestations(results);
  };

  return (
    <div>
      <title>Bienvenue sur Helpfix !</title>
      <Homevid />
      {role === 'prestataire' ? (
        <h2 className="hometitles">Vos Prestations</h2>
      ) : (
        <h2 className="hometitles">Nos Prestations</h2>
      )}
      <SearchBar />
      <div className="home">
        {role !== 'prestataire' && <PrestationFilter onFilter={handleFilter} />}
        <div className="workouts">
          {filteredPrestations && filteredPrestations.map(prestation => (
            <PrestationDetails prestation={prestation} key={prestation._id} />
          ))}
        </div>
        {role === 'prestataire' && <PrestationForm />}
      </div>
      {role !== 'prestataire' && (
        <>
          <h2 className="hometitles">Nos Catégories</h2>
          <Categories />
        </>
      )}
    </div>
  );
};

export default Home;
