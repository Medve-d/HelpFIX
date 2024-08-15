import { useEffect } from "react"
import { usePrestationsContext } from "../hooks/usePrestationsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import Homevid from "../components/videoHome";


// components
import PrestationDetails from "../components/PrestationDetails"
import PrestationForm from "../components/PrestationForm"

const Home = () => {
  const { prestations, dispatch } = usePrestationsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchPrestations = async () => {
      const response = await fetch('/api/prestation', {
        headers: {'Authorization': `Bearer ${user.token}`}, 
      }) 
      const json = await response.json()

      if (response.ok) {
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
      {user && (<PrestationForm />)}
      </div>
    </div>
  )
}

export default Home