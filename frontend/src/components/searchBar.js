import { useState } from "react";
import { usePrestationsContext } from "../hooks/usePrestationsContext";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { dispatch } = usePrestationsContext();

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);

    const response = await fetch(`/api/prestation?search=${e.target.value}`, {
      headers: { "Authorization": `Bearer ${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : ''}` },
    });
    
    if (response.ok) {
      const filteredPrestations = await response.json();
      dispatch({ type: 'SET_PRESTATIONS', payload: filteredPrestations });
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search prestations..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
