import { useEffect } from "react"
import { usePrestationsContext } from "../hooks/usePrestationsContext"
import { useAuthContext } from "../hooks/useAuthContext"


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
    <div>
      <div className="text content">
            <h1>Votre solution à tous vos besoins de services,</h1>
            <h2>c'est HelpFIX!</h2>
            {!user && (<a href="./signup"><button className="comBtn">Commencer</button></a>)}
          </div>
    </div>
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