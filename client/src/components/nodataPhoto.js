const Nodata = () => {
    return (
        <div className="nodata">
            <img
              src={`${process.env.PUBLIC_URL}/image/nodata.png`}
              alt="No data" 
              width={600}  
              className="nodata"
              />
            <h4 className="nodata-text">Aucune prestation disponible pour cette catégorie.</h4>
        </div>    
    );
};

export default Nodata;