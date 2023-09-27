import { useState, useRef, useEffect } from "react";
import "./image.css";

interface ImageProps {
  canvasColor: string;
  width: number;
  height: number;
  mainText: string;
  fontSize: number;
  fontFamily: string;
  updateMainTextYPosition: (updatedValue: number) => void;
  updateUserImagePosition: (updatedValue: { x: number; y: number }) => void;
  backdropImage?: string;
  userImage: string | null;
  mainTextColor: string;
  addTextShadow: boolean;
  textShadowColor: string;
  wallpaperImage: string | undefined;
}

const Image: React.FC<ImageProps> = ({
  canvasColor,
  width,
  height,
  mainText,
  fontSize,
  fontFamily,
  updateMainTextYPosition,
  updateUserImagePosition,
  backdropImage,
  userImage,
  mainTextColor,
  addTextShadow,
  textShadowColor,
  wallpaperImage,
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
          updateMainTextYPosition(clampedY);
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
          backgroundColor: `${!wallpaperImage ? canvasColor : "#ffffff"}`,
          width: `${width}px`,
          height: `${height}px`,
          position: "relative",
          textAlign: "center", // Center text horizontally
          backgroundSize: "cover", // Adjust this as needed
          overflow: "hidden",
        }}
      >
        <img
          src={backdropImage}
          alt="Backdrop Image"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            zIndex: 3,
          }}
        ></img>
        {wallpaperImage && (
          <img
            src={wallpaperImage}
            alt="Wallpaper Image"
            style={{
              width: "auto",
              height: `${height + 5}px`,
              objectFit: "contain",
              position: "absolute",
              zIndex: 0,
              opacity: 0.75,
            }}
          ></img>
        )}

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
              zIndex: 9,
            }}
            onMouseDown={handleImageMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />
        )}

        <span
          style={{
            color: mainTextColor,
            fontSize: `${fontSize}px`,
            fontFamily: fontFamily,
            userSelect: "none",
            cursor: textIsDragging ? "grabbing" : "grab",
            position: "absolute",
            left: `${textPosition.x}px`,
            top: `${textPosition.y}px`,
            width: "100%", // Expand the text to 100% width for centering
            textShadow: addTextShadow ? `2px 2px 2px ${textShadowColor}` : "",
            zIndex: 10,
          }}
          draggable="false"
          ref={textRef}
        >
          {mainText}
        </span>
      </div>
    </div>
  );
};

export default Image;
