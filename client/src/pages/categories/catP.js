import { useEffect } from "react";
import { usePrestationsContext } from "../../hooks/usePrestationsContext";
import CategoriesDtails from "../../components/categoriesDtails";
import Nodata from "../../components/nodataPhoto";

const CatP = () => {
  const { prestations, dispatch } = usePrestationsContext();
  const category = "Plomberie"; // You can dynamically set this if needed.

  useEffect(() => {
    const fetchPrestations = async () => {
      const response = await fetch(`/api/prestation?category=${category}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : ''}`,
        },
      });

      if (response.ok) {
        let prestations = await response.json();
        // Filtrer les prestations pour ne garder que celles avec le job "Plombier"
        prestations = prestations.filter(prestation => prestation.job === "Plombier");
        dispatch({ type: 'SET_PRESTATIONS', payload: prestations });
      }
    };

    fetchPrestations();
  }, [dispatch, category]);

  return (
    <div>
      <h1 className="h1 about">Plomberie</h1>
      <div className="ag-format-container">
        <div className="ag-courses_box">
          {prestations && prestations.length > 0 ? (
            prestations.map(prestation => (
              <CategoriesDtails prestation={prestation} key={prestation._id} />
            ))
          ) : null}
        </div>
      </div>
      {prestations && prestations.length === 0 && (
        <div className="nodata-container">
          <Nodata />
        </div>
      )}
    </div>
  );
};

export default CatP;
