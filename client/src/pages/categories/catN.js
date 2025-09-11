import { useEffect } from "react";
import { usePrestationsContext } from "../../hooks/usePrestationsContext";
import CategoriesDtails from "../../components/categoriesDtails";
import Nodata from "../../components/nodataPhoto";

const CatN = () => {
  const { prestations, dispatch } = usePrestationsContext();
  const category = "Services de Nettoyage"; // tu peux changer dynamiquement si besoin

  useEffect(() => {
    const fetchPrestations = async () => {
      const response = await fetch(`/api/prestation?category=${category}`, {
        headers: {
          "Authorization": `Bearer ${
            localStorage.getItem('user') 
              ? JSON.parse(localStorage.getItem('user')).token 
              : ''
          }`,
        },
      });

      if (response.ok) {
        const prestationsData = await response.json();
        dispatch({ type: 'SET_PRESTATIONS', payload: prestationsData });
      }
    };

    fetchPrestations();
  }, [dispatch, category]);

  const filteredPrestations = prestations 
    ? prestations.filter(prestation => prestation.category === "Services de Nettoyage") 
    : [];

  return (
    <div>
      <h1 className="h1 about">Services de Nettoyage</h1>
      <div className="ag-format-container">
        <div className="ag-courses_box">
          {filteredPrestations.length > 0 ? (
            filteredPrestations.map(prestation => (
              <CategoriesDtails prestation={prestation} key={prestation._id} />
            ))
          ) : (
            <div className="nodata-container">
              <Nodata />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatN;
