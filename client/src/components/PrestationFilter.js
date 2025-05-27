const PrestationFilter = () => {
  


  return (
    <form className="sideFilter"> 
    <div className='side-filter-container'>
      <label><strong>Catégories :</strong></label>
      <select>
        <option value="0">Choisi une catégorie</option>
        <option value="1">Plomberie</option>
        <option value="2">Services de Nettoyage</option>
        <option value="3">Réparation d'Appareils Électroménagers</option>
        <option value="4">Jardinage et Entretien Extérieur</option>
        <option value="5">Tutorat et Cours Particuliers</option>
        <option value="6">Déménagement et Transport</option>
      </select>
      <label><strong>Ville :</strong></label>
      <select>
        <option value="0">Choisi une ville</option>
        <option value="1">Paris</option>
        <option value="2">Marseille</option>
        <option value="3">Lyon</option>
        <option value="4">Toulouse</option>
        <option value="5">Nice</option>
        <option value="6">Nantes</option>
        <option value="7">Strasbourg</option>
      </select>
      
      <label><strong>Prix :</strong></label>
      <select>
        <option value="0">Choisi un prix</option>
        <option value="1">0-20</option>
        <option value="2">20-50</option>
        <option value="3">50-100</option>
        <option value="3">&lt;100</option>
      </select>
      <label><strong>Les avis :</strong></label>
      <select>
        <option value="0">sélectionner une avis</option>
        <option value="1">★☆☆☆☆</option>
        <option value="2">★★☆☆☆</option>
        <option value="3">★★★☆☆</option>
        <option value="4">★★★★☆</option>
      </select>
    </div>

   
    </form>
  )
}

export default PrestationFilter