import { useState } from 'react'
import { usePrestationsContext } from "../hooks/usePrestationsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const PrestationForm = () => {
  const { dispatch } = usePrestationsContext()  
  const { user } = useAuthContext()

  const villes = [
    "Paris",
    "Marseille",
    "Lyon",
    "Toulouse",
    "Nice",
    "Nantes",
    "Strasbourg"
  ]

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    job: '',
    description: '',
    category: '',
    ville: user?.ville || '' // Initialise avec la ville de l'utilisateur si disponible
  })
  
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!user) {
      setError('Vous devez être connecté')
      return
    }
        
    const prestation = {
      ...formData,
      userName: `${user.name} ${user.familyName}`,
      price: Number(formData.price),
      user_id: user._id
    }

    try {
      const response = await fetch('/api/prestation', {
        method: 'POST',
        body: JSON.stringify(prestation),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}` 
        }
      })
      
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Erreur lors de la création')
        setEmptyFields(data.missingFields || [])
        return
      }
      
      // Réinitialisation du formulaire (sauf la ville)
      setFormData(prev => ({
        title: '',
        price: '',
        job: '',
        description: '',
        category: '',
        ville: prev.ville // Garde la ville sélectionnée
      }))
      setError(null)
      setEmptyFields([])

      dispatch({ type: 'CREATE_PRESTATION', payload: data })
      
    } catch (err) {
      setError('Erreur réseau ou serveur')
      console.error('Erreur:', err)
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Ajouter une prestation</h3>

      <label>Titre :</label>
      <input 
        type="text" 
        name="title"
        onChange={handleChange} 
        value={formData.title}
        className={emptyFields.includes('title') ? 'error' : ''}
        required
      />

      <label>Prix (€) :</label>
      <input 
        type="number" 
        name="price"
        onChange={handleChange} 
        value={formData.price}
        className={emptyFields.includes('price') ? 'error' : ''}
        min="0"
        step="0.01"
        required
      />

      <label>Ville :</label>
      <select
        name="ville"
        onChange={handleChange}  
        value={formData.ville}
        className={emptyFields.includes('ville') ? 'error' : ''}
        required
      >
        <option value="">Sélectionnez une ville</option>
        {villes.map((ville) => (
          <option key={ville} value={ville}>{ville}</option>
        ))}
      </select>

      <label>Métier :</label>
      <input 
        type="text" 
        name="job"
        onChange={handleChange} 
        value={formData.job}
        className={emptyFields.includes('job') ? 'error' : ''}
        required
      />

      <label>Description :</label>
      <textarea 
        name="description"
        onChange={handleChange} 
        value={formData.description}
        className={emptyFields.includes('description') ? 'error' : ''}
        rows="4"
        required
      />
      
      <label>Catégorie :</label>
      <select
        name="category"
        onChange={handleChange}  
        value={formData.category}
        className={emptyFields.includes('category') ? 'error' : ''}
        required
      >
        <option value="">Choisissez une catégorie</option>
        <option value="Plomberie">Plomberie</option>
        <option value="Services de Nettoyage">Services de Nettoyage</option>
        <option value="Réparation d'Appareils Électroménagers">Réparation d'électroménager</option>
        <option value="Jardinage et Entretien Extérieur">Jardinage</option>
        <option value="Tutorat et Cours Particuliers">Cours particuliers</option>
        <option value="Déménagement et Transport">Déménagement</option>
      </select>

      <button type="submit" title="Ajouter">
        Ajouter la prestation
      </button>
      
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default PrestationForm