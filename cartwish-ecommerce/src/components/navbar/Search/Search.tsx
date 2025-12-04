import { useState, useEffect, type FormEvent, type KeyboardEvent } from "react";
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
  const [selectedItem, setSelectedItem] = useState(-1);
  const navigate = useNavigate();

  const handleSubmit = function (e: FormEvent) {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
    }
    setSuggestions([]);
  };

  const handleKeyDown = function (e: KeyboardEvent) {
    if (selectedItem < suggestions.length) {
      if (e.key === "ArrowDown") {
        setSelectedItem((current) =>
          current === suggestions.length - 1 ? 0 : current + 1
        );
      }
      if (e.key === "ArrowUp") {
        setSelectedItem((current) =>
          current === 0 ? suggestions.length - 1 : current - 1
        );
      }
      if (e.key === "Enter" && selectedItem > -1) {
        const suggestion = suggestions[selectedItem];
        navigate(`/products?search=${suggestion.title}`);
        setSearch("");
        setSuggestions([]);
      }
    }
    if (selectedItem >= suggestions.length) {
      setSelectedItem(-1);
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
        onKeyDown={handleKeyDown}
      />
      <button type="submit" className="search_button">
        Search
      </button>
      {suggestions.length > 0 && (
        <ul className="search_result">
          {suggestions.map((sugg, index) => (
            <li
              key={sugg._id}
              className={
                selectedItem === index
                  ? "search_suggestion_link active"
                  : "search_suggestion_link"
              }
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
