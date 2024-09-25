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
  const [category, setCategory] = useState('')
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
    const prestation = { title, price, ville, userName, job, description, category }

    
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
      setEmptyFields(json.emptyFields || []) // Default to an empty array if undefined
    }
    
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setTitle('')
      setPrice('')
      setJobe('')
      setDescription('')
      setCategory('')

      console.log('new prestation added:', json)
      dispatch({type: 'CREATE_PRESTATION', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Ajouter une prestation</h3>

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
      
      <label><strong>Catégories :</strong></label>
      <select
        onChange={(e) => setCategory(e.target.value)}  
        value={category}                            
        className={emptyFields.includes('category') ? 'error' : ''} 
      >
        <option value="">Choisi une catégorie</option>
        <option value="Plomberie">Plomberie</option>
        <option value="Services de Nettoyage">Services de Nettoyage</option>
        <option value="Réparation d'Appareils Électroménagers">Réparation d'Appareils Électroménagers</option>
        <option value="Jardinage et Entretien Extérieur">Jardinage et Entretien Extérieur</option>
        <option value="Tutorat et Cours Particuliers">Tutorat et Cours Particuliers</option>
        <option value="Déménagement et Transport">Déménagement et Transport</option>
      </select>

      <button title='Ajouter'>Ajouter la prestation</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default PrestationForm