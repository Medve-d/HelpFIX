import { useEffect } from "react"
import { useDemandeContext } from "../hooks/useDemandeContext"
import { useAuthContext } from "../hooks/useAuthContext"
import Homevid from "../components/videoHome"


// components
import DemandesDetails from "../components/demandesDetails"

const MesDemandes = () => {
  const { demandes, dispatch } = useDemandeContext()
  const {user, role} = useAuthContext()

  useEffect(() => {
    const fetchDemandes = async () => {
        let endpoint;
    
        if (role === 'client') {
          endpoint = '/api/demande/clientdemande';
        } else if (role === 'prestataire') {
          endpoint = '/api/demande/prestatairedemande';
        } else {
          return; 
        }
      const response = await fetch(endpoint, {
        headers: {'Authorization': `Bearer ${user.token}`}, 
      }) 

      if (response.ok) {
        const json = await response.json()
        dispatch({type: 'SET_DEMANDE', payload: json})
      }
    }

    if (user) {
        fetchDemandes()
    }
  }, [dispatch, user])

  return (
    
    <div>
     <div className="home">
      <div className="workouts">
        {demandes && demandes.map(demande => (
            <DemandesDetails demande={demande} key={demande._id} />
        ))}
      </div>
      </div>
    </div>
  )
}

export default MesDemandes