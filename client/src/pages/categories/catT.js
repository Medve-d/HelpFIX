import { useEffect } from "react";
import { usePrestationsContext } from "../../hooks/usePrestationsContext";
import CategoriesDtails from "../../components/categoriesDtails";
import Nodata from "../../components/nodataPhoto";

const CatT = () => {
  const { prestations, dispatch } = usePrestationsContext();
  const category = "Tutorat et Cours Particuliers"; // You can dynamically set this if needed.

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

  // Filtrer les prestations pour ne garder que celles avec le job "Tutorat"
  const filteredPrestations = prestations ? prestations.filter(prestation => prestation.job === "Tutorat") : [];

  return (
    <div>
      <h1 className="h1 about">Tutorat et Cours Particuliers</h1>
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
          <Nodata />
        </div>
      )}
    </div>
  );
};

export default CatT;
