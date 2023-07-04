import React, { useState } from "react";

const WordSearchCell = ({ letter, isSolution, position, toggleHighlight }) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  const handleClick = () => {
    setIsHighlighted(!isHighlighted);
    toggleHighlight(position);
  };

  const cellStyle = {
    backgroundColor: isSolution ? "yellow" : "white",
    width: "40px",
    height: "40px",
    padding: "4px",
    textAlign: "center",
    fontFamily: "Arial",
    position: "relative",
    border: isHighlighted ? "4px solid #6a0dad" : "1px solid black",
    fontWeight: isHighlighted ? "bold" : "normal",
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
