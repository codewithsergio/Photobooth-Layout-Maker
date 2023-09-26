import React, { useRef, useEffect, useState } from "react";
import "./image.css";

interface ImageProps {
  color: string;
  width: number;
  height: number;
  text: string;
  fontSize: number;
  fontFamily: string;
  textYPosition: number;
  updatetextYPosition: (updatedValue: number) => void;
}

const Image: React.FC<ImageProps> = ({
  color,
  width,
  height,
  text,
  fontSize,
  fontFamily,
  updatetextYPosition,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 550 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const textRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (textRef.current) {
      const handleMouseDown = (e: MouseEvent) => {
        setDragging(true);
        const boundingBox = textRef.current!.getBoundingClientRect();
        const offsetY = e.clientY - boundingBox.top + 90;
        setOffset({ x: 0, y: offsetY }); // Fixed X position to 0
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (dragging) {
          const newY = e.clientY - offset.y;

          // Ensure the text stays within the canvas boundaries
          const maxY = height - textRef.current!.offsetHeight;
          const minY = height - 150; // Minimum Y position 200px from the bottom

          // Restrict the Y position
          const clampedY = Math.max(minY, Math.min(maxY, newY));

          setPosition({ x: 0, y: clampedY });
          updatetextYPosition(clampedY);
        }
      };

      const handleMouseUp = () => {
        setDragging(false);
      };

      textRef.current.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        textRef.current!.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [dragging, offset, height]);

  return (
    <div className="customizable-image-container">
      <div
        className="customizable-image"
        style={{
          backgroundColor: color,
          width: `${width}px`,
          height: `${height}px`,
          position: "relative",
          textAlign: "center", // Center text horizontally
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: `${fontSize}px`,
            fontFamily: fontFamily,
            userSelect: "none",
            cursor: dragging ? "grabbing" : "grab",
            position: "absolute",
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: "100%", // Expand the text to 100% width for centering
          }}
          draggable="false"
          ref={textRef}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export default Image;
