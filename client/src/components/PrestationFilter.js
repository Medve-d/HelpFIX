import React, { useState } from 'react';

const PrestationFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    category: '',
    ville: '',
    priceRange: ''
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    if (onFilter) {
      onFilter(newFilters);
    }
  };

  return (
    <form className="sideFilter">
      <div className='side-filter-container'>
        <label><strong>Catégories :</strong></label>
        <select name="category" value={filters.category} onChange={handleFilterChange}>
          <option value="">Toutes les catégories</option>
          <option value="Plomberie">Plomberie</option>
          <option value="Services de Nettoyage">Services de Nettoyage</option>
          <option value="Réparation d'Appareils Électroménagers">Réparation d'Appareils Électroménagers</option>
          <option value="Jardinage et Entretien Extérieur">Jardinage et Entretien Extérieur</option>
          <option value="Tutorat et Cours Particuliers">Tutorat et Cours Particuliers</option>
          <option value="Déménagement et Transport">Déménagement et Transport</option>
        </select>

        <label><strong>Ville :</strong></label>
        <select name="ville" value={filters.ville} onChange={handleFilterChange}>
          <option value="">Toutes les villes</option>
          <option value="Paris">Paris</option>
          <option value="Marseille">Marseille</option>
          <option value="Lyon">Lyon</option>
          <option value="Toulouse">Toulouse</option>
          <option value="Nice">Nice</option>
          <option value="Nantes">Nantes</option>
          <option value="Strasbourg">Strasbourg</option>
        </select>

        <label><strong>Prix :</strong></label>
        <select name="priceRange" value={filters.priceRange} onChange={handleFilterChange}>
          <option value="">Toutes les fourchettes de prix</option>
          <option value="0-20">0-20 €</option>
          <option value="20-50">20-50 €</option>
          <option value="50-100">50-100 €</option>
          <option value="100+">Plus de 100 €</option>
        </select>
      </div>
    </form>
  );
};

export default PrestationFilter;
