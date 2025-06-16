import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = async (e) => {
    const keyword = e.target.value;
    setQuery(keyword);

    if (keyword.length > 1) {
      const res = await axios.get(`http://localhost:8080/courses/search?keyword=${keyword}`);
      setSuggestions(res.data.slice(0, 5)); // limit to 5 suggestions
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(query); // trigger parent search
      setSuggestions([]);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="What do you want to learn?"
        className="w-full px-4 py-2 border rounded-md"
        value={query}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white shadow-md border rounded-md">
          {suggestions.map((course, idx) => (
            <li key={idx} className="px-4 py-2 hover:bg-blue-100 cursor-pointer" onClick={() => {
              setQuery(course.title);
              onSearch(course.title);
              setSuggestions([]);
            }}>
              {course.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
