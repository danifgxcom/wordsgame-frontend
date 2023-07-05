// helpers.js

export function isPositionContiguous(position, lastPosition) {
    return (
      Math.abs(position.x - lastPosition.x) <= 1 &&
      Math.abs(position.y - lastPosition.y) <= 1
    );
  }
  
  export function isPositionMarked(position, markedPositions) {
    return markedPositions.some(
      (markedPosition) =>
        markedPosition.x === position.x && markedPosition.y === position.y
    );
  }