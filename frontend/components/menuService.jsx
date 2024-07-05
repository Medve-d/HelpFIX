

const Métiers = ['Plombier', 'Electricien', 'Monteur de meubles', "Agent d'entretien", 'Mécano', 'Baby-Sitter', 'Déménageur', 'Jardinier', 'Informaticien'];
export function default MenuService {
    return <>
    <option value="">Sélectionnez une ville</option>
            {cities.map((city, index) => (
              <option value={city} key={index}>{city}</option>
    </>
}