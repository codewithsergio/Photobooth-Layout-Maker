import React from "react";

interface SquareProps {
  topPosition: number;
  backgroundColor: string;
}

const Square: React.FC<SquareProps> = ({ topPosition, backgroundColor }) => {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "red",
    alignItems: "center", // Center horizontally
    width: "100%", // Occupy the full width of the parent
    height: "100px", // Set the desired height
  };

  const squareStyle: React.CSSProperties = {
    transform: `translate(-1px, 0px)`,
    top: topPosition,
    width: "188px",
    position: "absolute",
    height: "111px",
    backgroundColor: backgroundColor,
    zIndex: 3,
  };

  return (
    <div style={containerStyle}>
      <div style={squareStyle}></div>
    </div>
  );
};

export default Square;
