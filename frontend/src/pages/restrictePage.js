import { useNavigate } from 'react-router-dom';

const RestrictePage = () => {
const navigate = useNavigate()


const viewMemberships = () => {
    navigate('/memberships')
  }

  return (
    <div className="restricted-container">
      <div className="restricted">
          <img
            src={`${process.env.PUBLIC_URL}/image/nodata.png`}
            alt="No data" 
            width={600}  
            className="restricted-image"
            />
          <p className="nodata-text">Vous n'avez pas de souscription active.<br/>Pour utiliser notre plateforme, vous devez choisir l'une de nos options d'abonnement.</p>
          <button onClick={viewMemberships} className="restricted-button">Choisir une offre</button>
      </div> 
    </div> 
  );
};

export default RestrictePage;
