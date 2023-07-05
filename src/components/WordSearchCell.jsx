import React, { useState, useEffect } from "react";

const WordSearchCell = ({ letter, isSolution, position, toggleHighlight, isMarked, shouldClearWord }) => {
  const [isHighlighted, setIsHighlighted] = useState(isMarked);
  const [isFinal, setIsFinal] = useState(false);

  useEffect(() => {
    setIsHighlighted(isMarked);
  }, [isMarked]);

  useEffect(() => {
    if (shouldClearWord(position)) {
      setIsFinal(true);
    }
  }, [shouldClearWord, position]);

  const handleClick = () => {
    if (toggleHighlight(position)) {
      setIsHighlighted(!isHighlighted);
    }
  };

  const cellStyle = {
    backgroundColor: isFinal ? "lightgreen" : isSolution ? "yellow" : "white",
    width: "40px",
    height: "40px",
    padding: "4px",
    textAlign: "center",
    fontFamily: "Arial",
    position: "relative",
    border: isHighlighted ? "4px solid #6a0dad" : "1px solid black",
    fontWeight: isHighlighted ? "bold" : "normal"
  };

  const positionStyle = {
    position: "absolute",
    bottom: 0,
    right: 0,
    fontSize: "10px",
    color: "gray",
    visibility: isHighlighted ? "visible" : "hidden",
  };

  return (
    <td className="word-search-cell" style={cellStyle} onClick={handleClick}>
      {letter}
      <span style={positionStyle}>{`(${position.x},${position.y})`}</span>
    </td>
  );
};

export default WordSearchCell;
