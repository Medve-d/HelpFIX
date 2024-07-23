import { useState } from "react";
import styles from "../styles/InterfacePresta.module.css";

export default function AddAnnouncementForm({ onAdd }) {
  const [city, setCity] = useState("");
  const [job, setJob] = useState("");
  const [description, setDescription] = useState("");

  const cities = ["Paris", "Marseille", "Lyon", "Lille", "Bordeaux", "Nice"];
  const jobs = ["Plombier", "Electricien", "Monteur de meubles", "Agent d'entretien", "Mécano", "Baby-sitter", "Déménageur", "Jardinier", "Informaticien"];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!city || !job || !description) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const announcement = {
      city,
      job,
      description,
    };

    onAdd(announcement);

    setCity("");
    setJob("");
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

      <label htmlFor="job">Métier</label>
      <select
        id="job"
        value={job}
        onChange={(e) => setJob(e.target.value)}
        className={styles.input}
        required
      >
        <option value="">Sélectionnez un service</option>
        {jobs.map((job, index) => (
          <option key={index} value={job}>
            {job}
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
