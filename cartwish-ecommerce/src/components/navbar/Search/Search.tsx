import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getSuggestionsAPI } from "../../../services/productServices";
//moram sa curom ic se druzit danas nazalost
// nika fillmovi

const Search = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = function (e: FormEvent) {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
    }
  };
  useEffect(() => {
    if (search.trim() !== "") {
      getSuggestionsAPI(search)
        .then((res) => setSuggestions(res.data))
        .catch((err) => console.log(err));
    }
    if (search.trim() === "") {
      setSuggestions([]);
    }
  }, [search]);

  console.log(suggestions);

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
