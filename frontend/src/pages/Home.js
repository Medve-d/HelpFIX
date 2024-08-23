import { useEffect } from "react"
import { usePrestationsContext } from "../hooks/usePrestationsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import Homevid from "../components/videoHome"
import SearchBar from "../components/searchBar"


// components
import PrestationDetails from "../components/PrestationDetails"
import PrestationForm from "../components/PrestationForm"

const Home = () => {
  const { prestations, dispatch } = usePrestationsContext()
  const {user, role} = useAuthContext()

  useEffect(() => {
    const fetchPrestations = async () => {
      const endpoint = role === 'prestataire' ? '/api/prestation/myprestations' : '/api/prestation'

      const response = await fetch(endpoint, {
        headers: {'Authorization': `Bearer ${user.token}`}, 
      }) 

      if (response.ok) {
        const json = await response.json()
        dispatch({type: 'SET_PRESTATIONS', payload: json})
      }
    }

    if (user) {
      fetchPrestations()
    }
  }, [dispatch, user, role])

  return (
    
    <div>
    <Homevid />
    { (role === 'client' || role === 'admin') && <SearchBar />}
     <div className="home">
      <div className="workouts">
      
      {role === 'prestataire' && <h3>Mes prestations</h3> }
        {prestations && prestations.map(prestation => (
            <PrestationDetails prestation={prestation} key={prestation._id} />
        ))}
      </div>
      {role === 'prestataire' && (<PrestationForm />)}
      </div>
    </div>
  )
}

export default Home