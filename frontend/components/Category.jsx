import React, { useState } from 'react';
import Image from "next/image";
import styles from '../styles/category.module.css';

const categories = [
  { name: 'Plombier', src:"/images/plombier.jpg"},
  { name: 'Électricien', src: '/images/electricien.jpg' },
  { name: 'Monteur de meubles', src: '/images/monteur_meubles.jpg' },
  { name: 'Agent d\'entretien', src: '/images/agent_entretien.jpg' },
  { name: 'Mécano', src: '/images/mecano.jpg' },
  { name: 'Baby-sitter', src: '/images/baby_sitter.jpg' },
  { name: 'Déménageur', src: '/images/demenageur.jpg' },
  { name: 'Jardinier', src: '/images/jardinier.jpg' },
  { name: 'Informaticien', src: '/images/informaticien.jpg' },
];

const cities = ['Paris', 'Marseille', 'Lyon', 'Lille', 'Bordeaux', 'Nice'];

export default function Category() {
  const [selectedCity, setSelectedCity] = useState('');

  return (
    <>
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
        <div className={styles.container}>
          <h1 className={styles.title}>Choisissez une catégorie</h1>
          <div className={styles.categories}>
            {categories.map((category, index) => (
              <div className={styles.categoryCard} key={index}>
                <Image src={category.src} alt={category.name} width={250} height={250} className={styles.categoryImage} />
                <h2 className={styles.categoryName}>{category.name}</h2>
              </div>
            ))}
          </div>
        </div>

    </>
  );
}
