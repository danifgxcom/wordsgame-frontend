import React, { useState } from "react";

const WordSearchCell = ({ letter, isSolution, position }) => {
  const [showPosition, setShowPosition] = useState(false);

  const handleMouseOver = () => {
    setShowPosition(true);
  };

  const handleMouseOut = () => {
    setShowPosition(false);
  };

  const cellStyle = {
    backgroundColor: isSolution ? "yellow" : "white",
    width: "40px",
    height: "40px",
    padding: "4px",
    textAlign: "center",
    fontFamily: "Arial",
    position: "relative",
  };

  const positionStyle = {
    position: "absolute",
    bottom: 0,
    right: 0,
    fontSize: "10px",
    color: "gray",
  };

  return (
    <td
      className="word-search-cell"
      style={cellStyle}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {letter}
      {showPosition && <span style={positionStyle}>{`(${position.x},${position.y})`}</span>}
    </td>
  );
};

export default WordSearchCell;
