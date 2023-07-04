import React, { useState } from "react";
import WordSearchRow from "./WordSearchRow";

const WordSearch = ({ wordSearch }) => {
  const { matrix, solutions } = wordSearch;
  const [showSolutions, setShowSolutions] = useState(true);

  const toggleSolutions = () => {
    setShowSolutions(!showSolutions);
  };

  return (
    <div className="word-search-container">
      <button onClick={toggleSolutions}>
        {showSolutions ? "Hide Solutions" : "Show Solutions"}
      </button>
      <table className="word-search">
        <tbody>
          {matrix.map((row, rowIndex) => (
            <WordSearchRow
              key={rowIndex}
              row={row}
              rowIndex={rowIndex}
              solutions={solutions}
              showSolutions={showSolutions}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WordSearch;
