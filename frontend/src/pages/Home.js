import { useEffect } from "react"

import { usePrestationsContext } from "../hooks/usePrestationsContext"

// components
import PrestationDetails from "../components/PrestationDetails"
import PrestationForm from "../components/PrestationForm"

const Home = () => {
  const { prestations, dispatch } = usePrestationsContext()

  useEffect(() => {
    const fetchPrestations = async () => {
      const response = await fetch('/api/prestation')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_PRESTATIONS', payload: json})
      }
    }

    fetchPrestations()
  }, [dispatch])

  return (
    <div className="home">
      <div className="workouts">
        {prestations && prestations.map(prestation => (
            <PrestationDetails prestation={prestation} key={prestation._id} />
        ))}
      </div>
      <PrestationForm />
    </div>
  )
}

export default Home