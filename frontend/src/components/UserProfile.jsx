import { useState } from "react";
import styles from "../styles/UserProfile.module.css";

const UserProfile = () => {
  const [selectedOption, setSelectedOption] = useState("info");

  const renderContent = () => {
    switch (selectedOption) {
      case "info":
        return <div>Informations Personnelles</div>;
      case "history":
        return <div>Historique</div>;
      case "security":
        return <div>Sécurité</div>;
      case "transaction":
        return <div>Transaction</div>;
      case "help":
        return <div>Aide</div>;
      default:
        return <div>Informations Personnelles</div>;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <button onClick={() => setSelectedOption("info")} className={selectedOption === "info" ? styles.active : ""}>Info. Personnel</button>
        <button onClick={() => setSelectedOption("history")} className={selectedOption === "history" ? styles.active : ""}>Historique</button>
        <button onClick={() => setSelectedOption("security")} className={selectedOption === "security" ? styles.active : ""}>Sécurité</button>
        <button onClick={() => setSelectedOption("transaction")} className={selectedOption === "transaction" ? styles.active : ""}>Transaction</button>
        <button onClick={() => setSelectedOption("help")} className={selectedOption === "help" ? styles.active : ""}>Aide</button>
        <button className={styles.logoutButton}>Déconnexion</button>
      </div>
      <div className={styles.content}>
        {renderContent()}
      </div>
    </div>
  );
};

export default UserProfile;
