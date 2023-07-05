import React, { useState, useEffect } from "react";
import axios from "axios";
import WordSearch from "./components/WordSearch";
import WordList from "./components/WordList";

const App = () => {
  const [wordSearch, setWordSearch] = useState(null);
  const [foundWords, setFoundWords] = useState([]);

  useEffect(() => {
    generateWordSearch();
  }, []);

  const generateWordSearch = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/generate");
      const updatedWordSearch = { ...response.data, solutions: response.data.solutions };
      setWordSearch(updatedWordSearch);
    } catch (error) {
      console.error("Error generating word search:", error);
    }
  }
  

  return (
    <div className="App">
      <h1>Word Search</h1>
      {wordSearch ? (
  <div>
    <WordSearch wordSearch={wordSearch} foundWords={foundWords} setFoundWords={setFoundWords} />
    <WordList solutions={wordSearch.solutions} foundWords={foundWords} />
  </div>
) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
