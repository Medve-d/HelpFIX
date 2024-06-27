import React, { useState } from 'react';
import Image from "next/image";
import styles from '../styles/category.module.css';

const categories = [
  { name: 'Plombier', image: '/public/images/plombier.jpg' },
  { name: 'Électricien', image: '/public/images/plombier.jpg' },
  { name: 'Monteur de meubles', image: '/public/images/monteur_de_meubles.jpg' },
  { name: 'Agent d\'entretien', image: '/public/images/agent_d_entretien.jpg' },
  { name: 'Mécano', image: '/public/images/agent_d_entretien.jpg' },
  { name: 'Baby-sitter', image: '/public/images/agent_d_entretien.jpg' },
  { name: 'Déménageur', image: '/public/images/agent_d_entretien.jpg' },
  { name: 'Jardinier', image: '/public/images/agent_d_entretien.jpg' },
];

const cities = ['Paris', 'Marseille', 'Lyon', 'Lille', 'Bordeaux', 'Nice'];

export default function Category() {
  const [selectedCity, setSelectedCity] = useState('');

  return (
    <>
        <div className={styles.container}>
          <h1 className={styles.title}>Choisissez une catégorie</h1>
          <div className={styles.categories}>
            {categories.map((category, index) => (
              <div className={styles.categoryCard} key={index}>
                <Image src={category.image} alt={category.name} width={250} height={250} className={styles.categoryImage} />
                <h2 className={styles.categoryName}>{category.name}</h2>
              </div>
            ))}
          </div>
          <h2 className={styles.cityTitle}>Choisissez votre ville</h2>
          <select 
            className={styles.citySelect} 
            value={selectedCity} 
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">Sélectionnez une ville</option>
            {cities.map((city, index) => (
              <option value={city} key={index}>{city}</option>
            ))}
          </select>
        </div>
    </>
  );
}
