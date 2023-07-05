import React, { useState, useEffect } from "react";
import WordSearchRow from "./WordSearchRow";
import { isPositionContiguous, isPositionMarked } from "./helpers";

const sortAndRemoveDuplicates = (positions) => {
  const uniquePositions = positions.reduce((unique, pos) => {
    if (!unique.some((p) => p.x === pos.x && p.y === pos.y)) {
      unique.push(pos);
    }
    return unique;
  }, []);

  const sortedPositions = uniquePositions.sort((a, b) => {
    if (a.y === b.y) {
      return a.x - b.x;
    }
    return a.y - b.y;
  });

  return sortedPositions;
};

const WordSearch = ({ wordSearch, setFoundWords }) => {
  const { matrix, solutions } = wordSearch;
  const [showSolutions, setShowSolutions] = useState(true);
  const [markedPositions, setMarkedPositions] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [wordFound, setWordFound] = useState(false);
  const [updatedSolutions, setUpdatedSolutions] = useState(solutions);

  const toggleSolutions = () => {
    setShowSolutions(!showSolutions);
  };

  const toggleHighlight = (position) => {
    if (wordFound) {
      setMarkedPositions([]);
      setCurrentWord("");
      setWordFound(false);
      return;
    }

    const isPositionMarked = markedPositions.some(
      (markedPosition) =>
        markedPosition.x === position.x && markedPosition.y === position.y
    );

    const isPositionContiguous =
      markedPositions.length === 0 ||
      isAdjacentToLastPosition(position, markedPositions[markedPositions.length - 1]);

    if (isPositionMarked) {
      const filteredPositions = markedPositions.filter(
        (markedPosition) =>
          markedPosition.x !== position.x || markedPosition.y !== position.y
      );
      setMarkedPositions(filteredPositions);
    } else if (isPositionContiguous) {
      setMarkedPositions([...markedPositions, position]);
    }
  };

  const isAdjacentToLastPosition = (position, lastPosition) => {
    const deltaX = Math.abs(position.x - lastPosition.x);
    const deltaY = Math.abs(position.y - lastPosition.y);

    return deltaX <= 1 && deltaY <= 1;
  };

  useEffect(() => {
    const sortedAndUniquePositions = sortAndRemoveDuplicates(markedPositions);
    const word = sortedAndUniquePositions
      .map((position) => matrix[position.y][position.x])
      .join("");
    setCurrentWord(word);

    const foundSolution = updatedSolutions.find((solution) => solution.word === word);

    if (foundSolution) {
      console.log("WORD FOUND!");
      setWordFound(true);

      // Eliminar la palabra encontrada de la lista de soluciones
      const filteredSolutions = updatedSolutions.filter(
        (solution) => solution.word !== word
      );
      setUpdatedSolutions(filteredSolutions);

      setFoundWords((prevFoundWords) => [...prevFoundWords, foundSolution.word]);

    }
    
  }, [markedPositions, matrix, updatedSolutions, setFoundWords]);

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
              toggleSolution={toggleSolutions}
              toggleHighlight={toggleHighlight}
              markedPositions={markedPositions}
              isPositionContiguous={isPositionContiguous}
              isPositionMarked={isPositionMarked}
              currentWord={currentWord}
              wordFound={wordFound}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WordSearch;
