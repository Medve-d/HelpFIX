import { useState } from 'react'
import { usePrestationsContext } from "../hooks/usePrestationsContext"
import { useAuthContext } from '../hooks/useAuthContext'


const PrestationForm = () => {
  
  const { dispatch } = usePrestationsContext()  
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
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
        
    const userName = `${ user.name} ${ user.familyName}`;
    const ville = `${user.ville}`
    const prestation = { title, price, ville, userName, job, description }

    
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
      setTitle('')
      setPrice('')
      setJobe('')
      setDescription('')

      console.log('new prestation added:', json)
      dispatch({type: 'CREATE_PRESTATION', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Prestation</h3>

      <label>Title  :</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Prix (€) :</label>
      <input 
        type="Number" 
        onChange={(e) => setPrice(e.target.value)} 
        value={price}
        className={emptyFields.includes('price') ? 'error' : ''}
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