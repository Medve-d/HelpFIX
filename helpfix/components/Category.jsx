import React, { useState } from 'react';
import Head from "next/head";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import styles from '../styles/category.module.css'; // Assurez-vous que ce chemin est correct

const categories = [
  { name: 'Plombier', src: '' },
  { name: 'Électricien', image: '/images/electricien.jpg' },
  { name: 'Monteur de meubles', image: '/images/monteur_de_meubles.jpg' },
  { name: 'Agent d\'entretien', image: '/images/agent_d_entretien.jpg' },
  { name: 'Mécano', image: '/images/agent_d_entretien.jpg' },
  { name: 'Baby-sitter', image: '/images/agent_d_entretien.jpg' },
  { name: 'Déménageur', image: '/images/agent_d_entretien.jpg' },
  { name: 'Jardinier', image: '/images/agent_d_entretien.jpg' },
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
                <Image src={category.image} alt={category.name} width={150} height={150} className={styles.categoryImage} />
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
