import React, { useState } from "react";
import Image from "./components/Image";
import ColorPicker from "./components/ColorPicker";
import "./App.css";

function App() {
  const [width, setWidth] = useState(546);
  const [height, setHeight] = useState(1600);
  const [selectedColor, setSelectedColor] = useState("#ff9900");
  const [text, setText] = useState<string>("Jade and West Wedding");
  const [fontSize, setFontSize] = useState<number>(44); // Default font size
  const [fontFamily, setFontFamily] = useState<string>("Playfair Display"); // Default font family
  const [textYPosition, setTextYPosition] = useState<number>(930);

  // Function to update the variable
  const updatetextYPosition = (updatedValue: number) => {
    setTextYPosition(updatedValue);
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
      ctx.fillStyle = selectedColor;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#ffffff";
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.textAlign = "center";
      const textLines = getLines(ctx, text, width);
      for (let i = 0; i < textLines.length; i++) {
        const line = textLines[i];
        const lineHeight = 1.5 * fontSize;
        ctx.fillText(line, width / 2, textYPosition + 930 + i * lineHeight);
      }

      const url: string = canvas.toDataURL("image/png");
      const link: HTMLAnchorElement = document.createElement("a");
      link.href = url;
      link.download = "custom-image.png";
      link.click();
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
      <Image
        color={selectedColor}
        width={width / 2.5}
        height={height / 2.5}
        text={text}
        fontSize={fontSize / 2}
        fontFamily={fontFamily}
        textYPosition={textYPosition}
        updatetextYPosition={updatetextYPosition}
      />
      <ColorPicker onChange={handleColorChange} color={selectedColor} />
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text here"
      />
      <div>
        <label htmlFor="fontSize">Font Size:</label>
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
        <label htmlFor="fontFamily">Font Family:</label>
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
      <button onClick={() => downloadImage()}>Download Image</button>
    </div>
  );
}

export default App;
