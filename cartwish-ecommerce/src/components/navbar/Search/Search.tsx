import { useState, useEffect, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSuggestionsAPI } from "../../../services/productServices";
import "./Search.css";
//moram sa curom ic se druzit danas nazalost
// nika fillmovi

interface Suggestion {
  _id: string;
  title: string;
}

const Search = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const navigate = useNavigate();

  const handleSubmit = function (e: FormEvent) {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
    }
    setSuggestions([]);
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
      {suggestions.length > 0 && (
        <ul className="search_result">
          {suggestions.map((sugg) => (
            <li
              key={sugg._id}
              className="search_suggestion_link"
              onClick={() => {
                setSearch("");
                setSuggestions([]);
              }}
            >
              <Link to={`/products?search=${sugg.title}`}>{sugg.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default Search;
