import React, { useState } from "react";
import Image from "./components/Image";
import ColorPicker from "./components/ColorPicker";
import "./App.css";

function App() {
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(500);
  const [selectedColor, setSelectedColor] = useState("#ff9900"); // Default color is white
  const [text, setText] = useState<string>("Jade and West Wedding"); // Default text

  const handleColorChange = (newColor: string) => {
    setSelectedColor(newColor);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div className="app">
      <h1>Photobooth Layout Maker</h1>
      <Image color={selectedColor} width={width} height={height} text={text} />
      <ColorPicker onChange={handleColorChange} color={selectedColor} />
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text here"
      />
      <button onClick={() => downloadImage(selectedColor, text)}>
        Download Image
      </button>
    </div>
  );
}

function downloadImage(color: string, text: string) {
  const imageWidth = 300;
  const imageHeight = 500;
  const canvas = document.createElement("canvas");
  canvas.width = imageWidth;
  canvas.height = imageHeight;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, imageWidth, imageHeight);

    ctx.fillStyle = "#ffffff"; // Set the text color to white
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    ctx.fillText(text, imageWidth / 2, imageHeight - 20);

    const url: string = canvas.toDataURL("image/png");
    const link: HTMLAnchorElement = document.createElement("a");
    link.href = url;
    link.download = "custom-image.png";
    link.click();
  }
}

export default App;
