import { useEffect } from "react"
import { usePrestationsContext } from "../hooks/usePrestationsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import Homevid from "../components/videoHome"


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
  }, [dispatch, user])

  return (
    
    <div>
    <Homevid />
     <div className="home">
      <div className="workouts">
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