import { useState, useCallback, useRef, useEffect } from "react";
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
  updateUserImagePosition: (updatedValue: { x: number; y: number }) => void;
  overlayImage?: string;
  userImage: string | null;
}

const Image: React.FC<ImageProps> = ({
  color,
  width,
  height,
  text,
  fontSize,
  fontFamily,
  updatetextYPosition,
  updateUserImagePosition,
  overlayImage,
  userImage,
}) => {
  const [textPosition, setTextPosition] = useState({ x: 0, y: 550 });
  const [textIsDragging, setTextIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const textRef = useRef<HTMLSpanElement | null>(null);

  const [draggingImage, setDraggingImage] = useState(false);
  const [dragImageStartPos, setDragImageStartPos] = useState({
    x: 0,
    y: 0,
  });
  const [imagePosition, setImagePosition] = useState({
    x: 0,
    y: 0,
  });

  const handleImageMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    setDraggingImage(true);
    setDragImageStartPos({
      x: e.clientX - imagePosition.x,
      y: e.clientY - imagePosition.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (draggingImage) {
      const newX = e.clientX - dragImageStartPos.x;
      const newY = e.clientY - dragImageStartPos.y;

      // Calculate the boundaries
      const minX = -50;
      const minY = -50;
      const maxX = width - 160; // Adjust this value based on the image's width
      const maxY = height - 650; // Adjust this value based on the image's height

      // Clamp the new position within the boundaries
      const clampedX = Math.max(minX, Math.min(maxX, newX));
      const clampedY = Math.max(minY, Math.min(maxY, newY));

      setImagePosition({ x: clampedX, y: clampedY });
    }
  };

  const handleMouseUp = () => {
    console.log(imagePosition);
    updateUserImagePosition(imagePosition);
    setDraggingImage(false);
  };

  const imageStyle = {
    transform: `translate(${imagePosition.x}px, ${imagePosition.y}px)`,
  };

  useEffect(() => {
    if (textRef.current) {
      const handleMouseDown = (e: MouseEvent) => {
        setTextIsDragging(true);
        const boundingBox = textRef.current!.getBoundingClientRect();
        const offsetY = e.clientY - boundingBox.top + 90;
        setOffset({ x: 0, y: offsetY }); // Fixed X position to 0
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (textIsDragging) {
          const newY = e.clientY - offset.y;

          // Ensure the text stays within the canvas boundaries
          const maxY = height - textRef.current!.offsetHeight;
          const minY = height - 150; // Minimum Y position 200px from the bottom

          // Restrict the Y position
          const clampedY = Math.max(minY, Math.min(maxY, newY));

          setTextPosition({ x: 0, y: clampedY });
          updatetextYPosition(clampedY);
        }
      };

      const handleMouseUp = () => {
        setTextIsDragging(false);
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
  }, [textIsDragging, offset, height]);

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
          backgroundImage: overlayImage ? `url(${overlayImage})` : "none", // Apply the overlay image if provided
          backgroundSize: "cover", // Adjust this as needed
        }}
      >
        {userImage && (
          <img
            src={userImage}
            alt="User Uploaded Image"
            style={{
              ...imageStyle,
              width: "auto",
              height: "100px",
              objectFit: "contain",
              position: "absolute",
              cursor: draggingImage ? "grabbing" : "grab",
              zIndex: 1,
            }}
            onMouseDown={handleImageMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />
        )}

        <span
          style={{
            color: "white",
            fontSize: `${fontSize}px`,
            fontFamily: fontFamily,
            userSelect: "none",
            cursor: textIsDragging ? "grabbing" : "grab",
            position: "absolute",
            left: `${textPosition.x}px`,
            top: `${textPosition.y}px`,
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
