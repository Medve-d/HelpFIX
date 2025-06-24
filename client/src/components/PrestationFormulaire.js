import React, { useState } from 'react';

const PrestationFormulaire = ({ onAddPrestation }) => {
  const [prestation, setPrestation] = useState({
    title: '',
    price: '',
    job: '',
    description: '',
    ville: '',
    category: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrestation(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAddPrestation) {
      onAddPrestation(prestation);
    }
    setPrestation({
      title: '',
      price: '',
      job: '',
      description: '',
      ville: '',
      category: ''
    });
  };

  const jobOptions = [
    'Déménageur',
    'Tutorat',
    'Jardinage',
    'Plombier',
    'Entretien',
    'Réparation'
  ];

  const villeOptions = [
    'Paris',
    'Marseille',
    'Lyon',
    'Toulouse',
    'Nice',
    'Nantes',
    'Strasbourg'
  ];

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Titre"
        value={prestation.title}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Prix"
        value={prestation.price}
        onChange={handleChange}
        required
      />
      <select
        name="job"
        value={prestation.job}
        onChange={handleChange}
        required
      >
        <option value="">Sélectionnez un type de travail</option>
        {jobOptions.map(job => (
          <option key={job} value={job}>{job}</option>
        ))}
      </select>
      <textarea
        name="description"
        placeholder="Description"
        value={prestation.description}
        onChange={handleChange}
        required
      />
      <select
        name="ville"
        value={prestation.ville}
        onChange={handleChange}
        required
      >
        <option value="">Sélectionnez une ville</option>
        {villeOptions.map(ville => (
          <option key={ville} value={ville}>{ville}</option>
        ))}
      </select>
      <button type="submit">Ajouter la prestation</button>
    </form>
  );
};

export default PrestationFormulaire;
