import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError("Please enter a search term");
      return;
    }
    setError("");
    onSearch(searchQuery);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__row">
        <input
          type="text"
          placeholder="Enter topic"
          className="search-input"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button className="search__button" type="submit">
          Search
        </button>
      </div>
      {error && <p className="search-form__error">{error}</p>}
    </form>
  );
}

export default SearchForm;
