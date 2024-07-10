import { useState } from "react";
import styles from "../styles/InterfacePresta.module.css";

export default function AddAnnouncementForm() {
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");

  // Villes enregistrées
  const cities = ["Paris", "Marseille", "Lyon", "Lille", "Bordeaux", "Nice"];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation des données
    if (!city || !description) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    // Logique pour envoyer les données au backend ou les stocker dans l'état de l'application
    const announcement = {
      city,
      description,
    };

    console.log("Annonce ajoutée:", announcement);

    // Réinitialiser le formulaire après soumission
    setCity("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Ajouter une annonce</h2>

      <label htmlFor="city">Ville</label>
      <select
        id="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className={styles.input}
        required
      >
        <option value="">Sélectionnez une ville</option>
        {cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.textarea}
        required
      />

      <button type="submit" className={styles.button}>
        Ajouter l'annonce
      </button>
    </form>
  );
}
