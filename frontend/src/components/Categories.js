const Categories = () => {
    return (
      <div className="ag-format-container">
        <div className="ag-courses_box">
          <div className="ag-courses_item">
            <a href="/categories/plumbers" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Plomberie</div>
              <div className="ag-courses-item_date-box">
                <span className="ag-courses-item_date">Débouchage de canalisation</span><br /><br />
                <span className="ag-courses-item_date">Installation de sanitaires</span><br /><br />
                <span className="ag-courses-item_date">Débouchage de canalisations</span>
              </div>
            </a>
          </div>
          <div className="ag-courses_item">
            <a href="/categories/menage" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Services de Nettoyage</div>
              <div className="ag-courses-item_date-box">
                <span className="ag-courses-item_date">Nettoyage de maisons</span><br /><br />
                <span className="ag-courses-item_date">Nettoyage de bureaux</span><br /><br />
                <span className="ag-courses-item_date">Nettoyage après travaux</span>
              </div>
            </a>
          </div>
          <div className="ag-courses_item">
            <a href="/categories/reparation" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Réparation d'Appareils Électroménagers</div>
              <div className="ag-courses-item_date-box">
                <span className="ag-courses-item_date">Réparation de lave-linge</span><br /><br />
                <span className="ag-courses-item_date">Maintenance de réfrigérateurs</span><br /><br />
                <span className="ag-courses-item_date">Services de dépannage</span>
              </div>
            </a>
          </div>
          <div className="ag-courses_item">
            <a href="/categories/jardinage" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Jardinage et Entretien Extérieur</div>
              <div className="ag-courses-item_date-box">
                <span className="ag-courses-item_date">Aménagement paysager</span><br /><br />
                <span className="ag-courses-item_date">Entretien de jardins</span><br /><br />
                <span className="ag-courses-item_date">Nettoyage de terrasses</span>
              </div>
            </a>
          </div>
          <div className="ag-courses_item">
            <a href="/categories/tuto" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Tutorat et Cours Particuliers</div>
              <div className="ag-courses-item_date-box">
                <span className="ag-courses-item_date">Soutien scolaire</span><br /><br />
                <span className="ag-courses-item_date">Cours de langues</span><br /><br />
                <span className="ag-courses-item_date">Ateliers de compétences</span>
              </div>
            </a>
          </div>
          <div className="ag-courses_item">
            <a href="/categories/demenagment" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Déménagement et Transport</div>
              <div className="ag-courses-item_date-box">
                <span className="ag-courses-item_date">Aide au déménagement</span><br /><br />
                <span className="ag-courses-item_date">Services de transport</span><br /><br />
                <span className="ag-courses-item_date">Montage et démontage de meubles</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  export default Categories;
  