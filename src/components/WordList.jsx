import React from "react";

const WordList = ({ solutions, foundWords }) => {
  console.log(foundWords);

  return (
    <div className="word-list">
      <h2>Word List</h2>
      <ul>
        {solutions.map((solution) => (
          <li
          key={solution.word}
          style={{
            textDecoration: foundWords.includes(solution.word) ? "line-through" : "none",
            color: foundWords.includes(solution.word) ? "red" : "inherit",
          }}
        >
          {solution.word}
        </li>
        ))}
      </ul>
    </div>
  );
};

export default WordList;
