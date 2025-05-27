import { usePrestationsContext } from '../hooks/usePrestationsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { fr } from 'date-fns/locale'; 

const CategoriesDtails = ({ prestation }) => {
  const { dispatch } = usePrestationsContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();


  const handleClickView = () => {
    if (!user) {
      return;
    }
    navigate(`/prestation/${prestation._id}`);
  };
  

  return (
    <div className="ag-courses_item">
      <div  className="ag-courses-item_link" onClick={handleClickView}>
        <div className="ag-courses-item_bg"></div>
        <div className="ag-courses-item_title"><h4>{prestation.ville}</h4></div>
        <div className="ag-courses-item_date-box">
        <p><strong>{prestation.title}</strong></p>
        <p><strong>{prestation.price}€</strong></p>
        </div>
      </div>
    </div>
  );
};

export default CategoriesDtails;


