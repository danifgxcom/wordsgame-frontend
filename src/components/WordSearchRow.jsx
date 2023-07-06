import React from "react";
import WordSearchCell from "./WordSearchCell";
import { isPositionMarked } from "./helpers";

const WordSearchRow = ({
  row,
  rowIndex,
  solutions,
  showSolutions,
  toggleSolution,
  toggleHighlight,
  markedPositions,
  wordFound
}) => {
  const letters = row.split("");
  const solutionPositions = getSolutionPositions(solutions);
  const shouldClearWord = (currentPosition) => {
    if (wordFound) {
      // Verificar si currentPosition está en markedPositions utilizando la función isPositionMarked
      return isPositionMarked(currentPosition, markedPositions);
    }
    return false;
  };

  return (
    <tr className="word-search-row">
      {letters.map((letter, colIndex) => {
        const currentPosition = { x: colIndex, y: rowIndex };
        const isSolution = isPositionInSolutions(currentPosition, solutionPositions);
        const isSolutionVisible = isSolution && showSolutions;
        const isMarked = isPositionMarked(currentPosition, markedPositions);

        return (
          <WordSearchCell
            key={colIndex}
            letter={letter}
            isSolution={isSolutionVisible}
            position={currentPosition}
            isMarked={isMarked}
            toggleSolution={toggleSolution}
            toggleHighlight={toggleHighlight}
            shouldClearWord={shouldClearWord}
          />
        );
      })}
    </tr>
  );
};

const getSolutionPositions = (solutions) => {
  const positions = [];

  solutions.forEach((solution) => {
    const { startPosition, endPosition } = solution;
    const { x: startX, y: startY } = startPosition;
    const { x: endX, y: endY } = endPosition;

    if (startX === endX) {
      // Vertical word
      const incrementY = startY <= endY ? 1 : -1;
      for (let y = startY; y !== endY + incrementY; y += incrementY) {
        positions.push({ x: startX, y });
      }
    } else if (startY === endY) {
      // Horizontal word
      const incrementX = startX <= endX ? 1 : -1;
      for (let x = startX; x !== endX + incrementX; x += incrementX) {
        positions.push({ x, y: startY });
      }
    } else if (Math.abs(endY - startY) === Math.abs(endX - startX)) {
      // Diagonal word
      const incrementX = startX <= endX ? 1 : -1;
      const incrementY = startY <= endY ? 1 : -1;
      let x = startX;
      let y = startY;

      while (x !== endX + incrementX && y !== endY + incrementY) {
        positions.push({ x, y });
        x += incrementX;
        y += incrementY;
      }
    }
  });

  return positions;
};

const isPositionInSolutions = (position, solutionPositions) => {
  return solutionPositions.some((solutionPosition) => {
    return solutionPosition.x === position.x && solutionPosition.y === position.y;
  });
};

export default WordSearchRow;
