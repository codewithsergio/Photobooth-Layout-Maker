import React, { useState } from "react";
import LayoutImage from "./components/Image";
import ColorPicker from "./components/ColorPicker";
import "./App.css";
import BlackBackDrop from "./assets/backdropChoices/black.png";
import GoldBackDrop from "./assets/backdropChoices/gold.png";
import GreenBackDrop from "./assets/backdropChoices/green.png";
import SilverBackDrop from "./assets/backdropChoices/silver.png";
import WhiteBackDrop from "./assets/backdropChoices/white.png";
import BrownGlitterBackDrop from "./assets/backdropChoices/brownGlitter.png";

function App() {
  const [width, setWidth] = useState(546);
  const [height, setHeight] = useState(1600);
  const [selectedColor, setSelectedColor] = useState("#ff9900");
  const [text, setText] = useState<string>("Jade and West Wedding");
  const [fontSize, setFontSize] = useState<number>(44); // Default font size
  const [fontFamily, setFontFamily] = useState<string>("Playfair Display"); // Default font family
  const [textYPosition, setTextYPosition] = useState<number>(550);
  const [userImagePosition, setUserImagePosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const [selectedImage, setSelectedImage] = useState<string>(BlackBackDrop);
  const backdropOptions = [
    BlackBackDrop, // Default image
    GoldBackDrop,
    GreenBackDrop,
    SilverBackDrop,
    WhiteBackDrop,
    BrownGlitterBackDrop,
    // Add more image options as needed
  ];

  const backdropLabels = [
    "Black", // Label for the default image
    "Gold",
    "Green",
    "Silver",
    "White",
    "Brown",
    // Add labels for other image options
  ];

  const [userImage, setUserImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageSrc = e.target?.result as string;
        setUserImage(imageSrc);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to update the variable
  const updatetextYPosition = (updatedValue: number) => {
    setTextYPosition(updatedValue);
  };

  // Function to update the variable
  const updateUserImagePosition = (updatedValue: { x: number; y: number }) => {
    setUserImagePosition(updatedValue);
  };

  const fontSizes = ["32px", "38px", "44px", "60px"];
  const fontFamilies = [
    "Caveat",
    "Croissant One",
    "Dancing Script",
    "Inter",
    "Lato",
    "Playfair Display",
  ];

  function getLines(
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number
  ) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
      var word = words[i];
      var thisWidth = ctx.measureText(currentLine + " " + word).width;
      if (thisWidth < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  }

  function downloadImage() {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Draw the selected overlay image
      const overlayImg = new Image();
      overlayImg.onload = () => {
        // Fill the canvas with the selected color
        ctx.fillStyle = selectedColor;
        ctx.fillRect(0, 0, width, height);

        ctx.drawImage(overlayImg, 0, 0, width, height);

        // Draw the user-uploaded image at the specified position if it exists
        if (userImage) {
          const userImg = new Image();
          userImg.onload = () => {
            const imgHeight = 100 * 2.5; // Set the desired width
            const aspectRatio = userImg.width / userImg.height;
            const imgWidth = imgHeight * aspectRatio; // Calculate height to maintain aspect ratio
            console.log(imgWidth, imgHeight, aspectRatio);
            var widthOffSetForDownload = 0;
            if (imgWidth < imgHeight) {
              widthOffSetForDownload += imgHeight - imgWidth;
              widthOffSetForDownload /= 2;
            }
            ctx.drawImage(
              userImg,
              userImagePosition.x * 2.5 + 150 + widthOffSetForDownload,
              userImagePosition.y * 2.5 + imgHeight + 1100,
              imgWidth, // Adjust the width as needed
              imgHeight // Adjust the height as needed
            );

            // Draw text on the canvas
            ctx.fillStyle = "#ffffff";
            ctx.font = `${fontSize}px ${fontFamily}`;
            ctx.textAlign = "center";
            const textLines = getLines(ctx, text, width);
            for (let i = 0; i < textLines.length; i++) {
              const line = textLines[i];
              const lineHeight = 1.5 * fontSize;
              ctx.fillText(
                line,
                width / 2,
                textYPosition * 2.5 + 50 + i * lineHeight
              );
            }

            // Create a download link for the canvas image
            const url = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = url;
            link.download = "custom-image.png";
            link.click();
          };
          userImg.src = userImage;
        } else {
          // Draw text on the canvas (if no userImage)
          ctx.fillStyle = "#ffffff";
          ctx.font = `${fontSize}px ${fontFamily}`;
          ctx.textAlign = "center";
          const textLines = getLines(ctx, text, width);
          for (let i = 0; i < textLines.length; i++) {
            const line = textLines[i];
            const lineHeight = 1.5 * fontSize;
            ctx.fillText(
              line,
              width / 2,
              textYPosition * 2.5 + 50 + i * lineHeight
            );
          }

          // Create a download link for the canvas image
          const url = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = url;
          link.download = "custom-image.png";
          link.click();
        }
      };
      overlayImg.src = selectedImage;
    }
  }

  const handleColorChange = (newColor: string) => {
    setSelectedColor(newColor);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleFontSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFontSize(parseInt(event.target.value));
  };

  const handleFontFamilyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFontFamily(event.target.value);
  };

  return (
    <div className="app">
      <h1>Photobooth Layout Maker</h1>
      <div className="workshop">
        <div className="editingTools">
          <h3>Choose a backdrop</h3>
          <select
            onChange={(e) => setSelectedImage(e.target.value)}
            value={selectedImage}
          >
            {backdropOptions.map((option, index) => (
              <option key={index} value={option}>
                {backdropLabels[index]}
              </option>
            ))}
          </select>
          <h3>Choose a background color</h3>
          <ColorPicker onChange={handleColorChange} color={selectedColor} />
          <h3>Main text</h3>
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            placeholder="Enter text here"
          />
          <h3>Text size</h3>
          <div>
            <select
              id="fontSize"
              onChange={handleFontSizeChange}
              value={`${fontSize}px`}
            >
              {fontSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3>Font family</h3>
            <select
              id="fontFamily"
              onChange={handleFontFamilyChange}
              value={fontFamily}
            >
              {fontFamilies.map((family) => (
                <option key={family} value={family}>
                  {family}
                </option>
              ))}
            </select>
          </div>
          <h3>Add your own photo</h3>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <h3>Done</h3>
          <button onClick={() => downloadImage()}>Download Image</button>
        </div>
        <LayoutImage
          color={selectedColor}
          width={width / 2.5}
          height={height / 2.5}
          text={text}
          fontSize={fontSize / 2.2}
          fontFamily={fontFamily}
          textYPosition={textYPosition}
          updatetextYPosition={updatetextYPosition}
          updateUserImagePosition={updateUserImagePosition}
          overlayImage={selectedImage}
          userImage={userImage} // Pass the user-uploaded image
        />
      </div>
    </div>
  );
}

export default App;
