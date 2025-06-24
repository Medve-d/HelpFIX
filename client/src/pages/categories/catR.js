import { useEffect } from "react";
import { usePrestationsContext } from "../../hooks/usePrestationsContext";
import CategoriesDtails from "../../components/categoriesDtails";
import Nodata from "../../components/nodataPhoto";

const CatR = () => {
  const { prestations, dispatch } = usePrestationsContext();
  const category = "Réparation d'Appareils Électroménagers"; // You can dynamically set this if needed.

  useEffect(() => {
    const fetchPrestations = async () => {
      const response = await fetch(`/api/prestation?category=${category}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : ''}`,
        },
      });

      if (response.ok) {
        const prestations = await response.json();
        dispatch({ type: 'SET_PRESTATIONS', payload: prestations });
      }
    };

    fetchPrestations();
  }, [dispatch, category]);

  // Filtrer les prestations pour ne garder que celles avec le job "Réparation"
  const filteredPrestations = prestations?.filter(prestation => prestation.job === "Réparation");

  return (
    <div>
      <h1 className="h1 about">Réparation d'Appareils Électroménagers</h1>
      <div className="ag-format-container">
        <div className="ag-courses_box">
          {filteredPrestations && filteredPrestations.length > 0 ? (
            filteredPrestations.map(prestation => (
              <CategoriesDtails prestation={prestation} key={prestation._id} />
            ))
          ) : null}
        </div>
      </div>
      {filteredPrestations && filteredPrestations.length === 0 && (
        <div className="nodata-container">
          <Nodata/>
        </div>
      )}
    </div>
  );
};

export default CatR;
