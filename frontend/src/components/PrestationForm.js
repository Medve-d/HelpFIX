import { useState } from 'react'
import { usePrestationsContext } from "../hooks/usePrestationsContext"
import { useAuthContext } from '../hooks/useAuthContext'


const PrestationForm = () => {
  
  const { dispatch } = usePrestationsContext()  
  const { user } = useAuthContext()

  const [ville, setVille] = useState('')
  const [job, setJobe] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!user) {
      setError('You must be logged in')
      return
    }

    const prestation = {ville, job, description}
    
    const response = await fetch('/api/prestation', {
      method: 'POST',
      body: JSON.stringify(prestation),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}` 
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setVille('')
      setJobe('')
      setDescription('')

      console.log('new prestation added:', json)
      dispatch({type: 'CREATE_PRESTATION', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Prestation</h3>

      <label>Ville  :</label>
      <input 
        type="text" 
        onChange={(e) => setVille(e.target.value)} 
        value={ville}
        className={emptyFields.includes('ville') ? 'error' : ''}
      />

      <label>Job  :</label>
      <input 
        type="text" 
        onChange={(e) => setJobe(e.target.value)} 
        value={job}
        className={emptyFields.includes('job') ? 'error' : ''}
      />

      <label>Description :</label>
      <input 
        type="text" 
        onChange={(e) => setDescription(e.target.value)} 
        value={description} 
        className={emptyFields.includes('description') ? 'error' : ''}
      />

      <button>Add Prestation</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default PrestationForm