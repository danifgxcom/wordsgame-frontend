import React from "react";

const WordList = ({ solutions }) => {
  return (
    <div className="word-list">
      <h2>Words:</h2>
      <ul>
        {solutions.map((solution, index) => (
          <li key={index}>{solution.word}</li>
        ))}
      </ul>
    </div>
  );
};

export default WordList;
