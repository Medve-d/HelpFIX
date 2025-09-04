import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import PrestationDetails from "../components/PrestationDetails";

const MesDemandes = () => {
  const { user } = useAuthContext();
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDemandes = async () => {
      if (!user) return;

      try {
        const response = await fetch('/api/prestation/mesdemandes', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors du chargement des demandes");
        }

        const data = await response.json();
        setDemandes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDemandes();
  }, [user]);

  return (
    <div className="mes-demandes-page">
      <h2 className="hometitles">Mes Demandes</h2>

      {loading && <p>Chargement des demandes...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && demandes.length === 0 && (
        <p>Vous n’avez pas encore créé de demandes.</p>
      )}

      <div className="workouts">
        {demandes.map((prestation) => (
          <PrestationDetails prestation={prestation} key={prestation._id} />
        ))}
      </div>
    </div>
  );
};

export default MesDemandes;
