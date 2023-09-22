import React from "react";
import "./image.css";

interface ImageProps {
  color: string;
  width: number;
  height: number;
  text: string;
}

const Image: React.FC<ImageProps> = ({ color, width, height, text }) => {
  return (
    <div className="customizable-image-container">
      <div
        className="customizable-image"
        style={{
          backgroundColor: color,
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        <span
          style={{
            color: "white", // Set the text color (you can adjust this as needed)
            fontSize: "24px", // Set the text font size (you can adjust this as needed)
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export default Image;
