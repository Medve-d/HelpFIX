import styles from '../styles/CityService.module.css';

const Métiers = ['Plombier', 'Electricien', 'Monteur de meubles', "Agent d'entretien", 'Mécano', 'Baby-Sitter', 'Déménageur', 'Jardinier', 'Informaticien'];

export default function MenuService() {
    return (
        <select className={styles.serviceSelect}>
            <option value="">Sélectionnez un service</option>
            {Métiers.map((metier, index) => (
                <option value={metier} key={index}>{metier}</option>
            ))}
        </select>
    );
}
