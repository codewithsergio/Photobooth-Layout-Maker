import React, { useState, useRef } from "react";
import LayoutImage from "./components/Image";
import ColorPicker from "./components/ColorPicker";
import "./App.css";
import BlackBackDrop from "./assets/backdropChoices/black.png";
import GoldBackDrop from "./assets/backdropChoices/gold.png";
import GreenBackDrop from "./assets/backdropChoices/green.png";
import SilverBackDrop from "./assets/backdropChoices/silver.png";
import WhiteBackDrop from "./assets/backdropChoices/white.png";
import BrownGlitterBackDrop from "./assets/backdropChoices/brownGlitter.png";
import Pattern1 from "./assets/backgroundPreselected/pattern1.png";
import Pattern2 from "./assets/backgroundPreselected/pattern2.png";
import Pattern3 from "./assets/backgroundPreselected/pattern3.png";
import Pattern4 from "./assets/backgroundPreselected/pattern4.png";
import Pattern5 from "./assets/backgroundPreselected/pattern5.png";
import Pattern6 from "./assets/backgroundPreselected/pattern6.png";
import Pattern7 from "./assets/backgroundPreselected/pattern7.png";

function App() {
  const [width, setWidth] = useState(546);
  const [height, setHeight] = useState(1600);
  const [canvasColor, setCanvasColor] = useState("#1E90FF");
  const [mainText, setMainText] = useState<string>("Jade and West Wedding"); // Default text
  const [fontSize, setFontSize] = useState<number>(44); // Default font size
  const [fontFamily, setFontFamily] = useState<string>("Playfair Display"); // Default font family
  const [mainTextYPosition, setMainTextYPosition] = useState<number>(550); // Default text position
  const [userImagePosition, setUserImagePosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const [backdropImage, setBackdropImage] = useState<string>(BlackBackDrop);
  const backdropOptions = [
    BlackBackDrop, // Default image
    GoldBackDrop,
    GreenBackDrop,
    SilverBackDrop,
    WhiteBackDrop,
    BrownGlitterBackDrop,
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

  const [wallpaperImage, setWallpaperImage] = useState<string | undefined>(
    undefined
  );
  const wallpaperOptions = [
    Pattern1, // Default image
    Pattern2,
    Pattern3,
    Pattern4,
    Pattern5,
    Pattern6,
    Pattern7,
    "",
  ];

  const wallpaperLabels = [
    "rainbow glass", // Default image
    "black glass",
    "colorful squares",
    "white roses",
    "flowers",
    "cubes",
    "blue floral",
    "None",
  ];

  const [userImage, setUserImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(event.target.files);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageSrc = e.target?.result as string;
        setUserImage(imageSrc);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateMainTextYPosition = (updatedValue: number) => {
    setMainTextYPosition(updatedValue);
  };

  const updateUserImagePosition = (updatedValue: { x: number; y: number }) => {
    setUserImagePosition(updatedValue);
  };

  const handleDeleteImage = () => {
    setUserImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input
    }
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

  const [addTextShadow, setAddTextShadow] = useState(false);
  const [textShadowColor, setTextShadowColor] = useState("#000000");

  const handleTextShadowColorChange = (newColor: string) => {
    setTextShadowColor(newColor);
  };

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

  function drawText(ctx: CanvasRenderingContext2D) {
    // Draw text on the canvas
    ctx.fillStyle = mainTextColor;
    ctx.font = `${fontSize + 6}px ${fontFamily}`;
    ctx.textAlign = "center";
    const textLines = getLines(ctx, mainText, width);
    if (addTextShadow) {
      ctx.shadowColor = textShadowColor;
      ctx.shadowBlur = 2 * 2.5;
      ctx.shadowOffsetY = 2 * 2.5;
      ctx.shadowOffsetX = 2 * 2.5;
    }
    for (let i = 0; i < textLines.length; i++) {
      const line = textLines[i];
      const lineHeight = 1.5 * fontSize;
      ctx.fillText(
        line,
        width / 2,
        mainTextYPosition * 2.5 + 50 + i * lineHeight
      );
    }
  }

  function downloadFinalImageLink(canvas: HTMLCanvasElement) {
    // Create a download link for the canvas image
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "custom-image.png";
    link.click();
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
        ctx.fillStyle = canvasColor;
        ctx.fillRect(0, 0, width, height);

        ctx.drawImage(overlayImg, 0, 0, width, height);

        // Draw the user-uploaded image at the specified position if it exists
        if (userImage) {
          const userImg = new Image();
          userImg.onload = () => {
            const imgHeight = 100 * 2.5;
            const aspectRatio = userImg.width / userImg.height;
            const imgWidth = imgHeight * aspectRatio; // Calculate height to maintain aspect ratio
            console.log(imgWidth, imgHeight, aspectRatio);
            var widthOffSetForDownload = 0;
            if (imgWidth < imgHeight) {
              widthOffSetForDownload += imgHeight - imgWidth;
              widthOffSetForDownload /= 2;
            } else {
              widthOffSetForDownload -= imgWidth - imgHeight;
              widthOffSetForDownload /= 2;
            }
            ctx.drawImage(
              userImg,
              userImagePosition.x * 2.5 + 150 + widthOffSetForDownload,
              userImagePosition.y * 2.5 + imgHeight + 1100,
              imgWidth,
              imgHeight
            );

            /////////////////////////
            // Draw Text on screen //
            /////////////////////////

            drawText(ctx);

            /////////////////////////
            // Download Final Photo //
            /////////////////////////

            downloadFinalImageLink(canvas);
          };
          userImg.src = userImage;
        } else {
          /////////////////////////
          // Draw Text on screen //
          /////////////////////////

          drawText(ctx);

          /////////////////////////
          // Download Photo //
          /////////////////////////

          downloadFinalImageLink(canvas);
        }
      };
      overlayImg.src = backdropImage;
    }
  }

  const handleColorChange = (newColor: string) => {
    setCanvasColor(newColor);
  };

  const [mainTextColor, setMainTextColor] = useState("#000000");

  const handleMainTextColorChange = (newColor: string) => {
    setMainTextColor(newColor);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMainText(event.target.value);
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
            onChange={(e) => setBackdropImage(e.target.value)}
            value={backdropImage}
          >
            {backdropOptions.map((option, index) => (
              <option key={index} value={option}>
                {backdropLabels[index]}
              </option>
            ))}
          </select>
          <h3>Choose a wallpaper</h3>
          <select
            onChange={(e) => setWallpaperImage(e.target.value)}
            value={wallpaperImage}
          >
            {wallpaperOptions.map((option, index) => (
              <option key={index} value={option}>
                {wallpaperLabels[index]}
              </option>
            ))}
          </select>
          <h3>Choose a background color</h3>
          <ColorPicker onChange={handleColorChange} color={canvasColor} />
          <h3>Main text</h3>
          <input
            type="text"
            value={mainText}
            onChange={handleTextChange}
            placeholder="Enter text here"
          />
          <h3>Change text color</h3>
          <ColorPicker
            onChange={handleMainTextColorChange}
            color={mainTextColor}
          />
          <h3>Text Effects</h3>
          <input
            type="checkbox"
            checked={addTextShadow}
            onChange={() => setAddTextShadow(!addTextShadow)}
          />
          <h4>Text Effects Color</h4>
          <ColorPicker
            onChange={handleTextShadowColorChange}
            color={textShadowColor}
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
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
          />
          <button onClick={handleDeleteImage}>Delete</button>
          <h3>Done</h3>
          <button onClick={() => downloadImage()}>Download Image</button>
        </div>
        <LayoutImage
          canvasColor={canvasColor}
          mainTextColor={mainTextColor}
          width={width / 2.5}
          height={height / 2.5}
          mainText={mainText}
          fontSize={fontSize / 2.2}
          fontFamily={fontFamily}
          updateMainTextYPosition={updateMainTextYPosition}
          updateUserImagePosition={updateUserImagePosition}
          backdropImage={backdropImage}
          userImage={userImage}
          addTextShadow={addTextShadow}
          textShadowColor={textShadowColor}
          wallpaperImage={wallpaperImage}
        />
      </div>
    </div>
  );
}

export default App;
