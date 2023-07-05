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

const WordSearch = ({ wordSearch }) => {
  const { matrix, solutions } = wordSearch;
  const [showSolutions, setShowSolutions] = useState(true);
  const [markedPositions, setMarkedPositions] = useState([]);

  const toggleSolutions = () => {
    setShowSolutions(!showSolutions);
  };

  const toggleHighlight = (position) => {
    const isPositionMarked = markedPositions.some(
      (markedPosition) =>
        markedPosition.x === position.x && markedPosition.y === position.y
    );

    const isPositionContiguous =
      markedPositions.length === 0 ||
      isAdjacentToLastPosition(position, markedPositions[markedPositions.length - 1]);

    if (isPositionMarked) {
      // Si la posición ya está marcada, se remueve del vector
      const filteredPositions = markedPositions.filter(
        (markedPosition) =>
          markedPosition.x !== position.x || markedPosition.y !== position.y
      );
      setMarkedPositions(filteredPositions);
    } else if (isPositionContiguous) {
      // La posición actual es contigua, se agrega al vector de posiciones marcadas
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
    console.log("Marked Positions:", sortedAndUniquePositions);
  }, [markedPositions]);

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
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WordSearch;
