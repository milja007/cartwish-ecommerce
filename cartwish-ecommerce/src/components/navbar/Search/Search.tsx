import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
//moram sa curom ic se druzit danas nazalost

const Search = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSubmit = function (e: FormEvent) {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
    }
  };

  return (
    <form className="navbar_form align-center" onSubmit={handleSubmit}>
      <input
        type="text"
        className="navbar_search"
        placeholder="Search Products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="search_button">
        Search
      </button>
    </form>
  );
};

export default Search;
