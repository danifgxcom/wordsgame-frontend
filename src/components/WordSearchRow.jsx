import React from "react";
import WordSearchCell from "./WordSearchCell";

const WordSearchRow = ({ row, rowIndex, solutions, showSolutions, toggleSolution }) => {
  const letters = row.split("");
  const solutionPositions = getSolutionPositions(solutions);

  return (
    <tr className="word-search-row">
      {letters.map((letter, colIndex) => {
        const currentPosition = { x: colIndex, y: rowIndex };
        const isSolution = isPositionInSolutions(currentPosition, solutionPositions);
        const isSolutionVisible = isSolution && showSolutions;

        return (
          <WordSearchCell
            key={colIndex}
            letter={letter}
            isSolution={isSolutionVisible}
            position={currentPosition}
            toggleSolution={toggleSolution}
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
      const incrementY = startY <= endY ? 1 : -1; // Determinar el incremento en función de la dirección
      for (let y = startY; y !== endY + incrementY; y += incrementY) {
        positions.push({ x: startX, y });
      }
    } else if (startY === endY) {
      // Horizontal word
      const incrementX = startX <= endX ? 1 : -1; // Determinar el incremento en función de la dirección
      for (let x = startX; x !== endX + incrementX; x += incrementX) {
        positions.push({ x, y: startY });
      }
    } else {
      // Diagonal word
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const incrementX = deltaX > 0 ? 1 : -1;
      const incrementY = deltaY > 0 ? 1 : -1;
      let x = startX;
      let y = startY;

      while (x !== endX || y !== endY) {
        positions.push({ x, y });
        x += incrementX;
        y += incrementY;
      }

      positions.push({ x: endX, y: endY });
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
