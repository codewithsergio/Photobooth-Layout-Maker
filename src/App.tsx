import React, { useState, useRef } from "react";
import LayoutImage from "./components/Image";
import ColorPicker from "./components/ColorPicker";
import "./App.css";
import {
  BlackBackDrop,
  GoldBackDrop,
  GreenBackDrop,
  SilverBackDrop,
  WhiteBackDrop,
  BrownGlitterBackDrop,
  Pattern1,
  Pattern2,
  Pattern3,
  Pattern4,
  Pattern5,
  Pattern6,
  Pattern7,
} from "./config/imagePaths";
import Backdesign from "./components/Backdesign";

function App() {
  // Canvas Variables //
  const [width, setWidth] = useState(546); // Printout width
  const [height, setHeight] = useState(1600); // Printout height
  const [canvasColor, setCanvasColor] = useState("#1E90FF"); // Printout default background color
  // //

  // Main Text Variables //
  const [mainText, setMainText] = useState<string>("Jade and West Wedding"); // Default text
  const [fontSize, setFontSize] = useState<number>(44); // Default font size
  const [fontFamily, setFontFamily] = useState<string>("Playfair Display"); // Default font family
  const [mainTextColor, setMainTextColor] = useState("#000000"); // default text color
  const [mainTextYPosition, setMainTextYPosition] = useState<number>(550); // Default text position
  const [addTextShadow, setAddTextShadow] = useState(false); // default add text shadow
  const [textShadowColor, setTextShadowColor] = useState("#000000"); // default shadow color
  // //

  // Secondary Text Variables //
  const [secondaryText, setSecondaryText] = useState("October 5th, 2023");
  const [wantSecondaryText, setWantSecondaryText] = useState(false);
  const [secondaryFontSize, setSecondaryFontSize] = useState<number>(38);
  const [secondaryFontFamily, setSecondaryFontFamily] =
    useState<string>("Playfair Display");
  const [secondaryTextColor, setSecondaryTextColor] =
    useState<string>("#000000");
  const [secondaryTextYPosition, setSecondaryTextYPosition] = useState(600);
  const [addSecondaryTextShadow, setAddSecondaryTextShadow] = useState(false);
  const [secondaryTextShadowColor, setSecondaryTextShadowColor] =
    useState("#000000");

  // //

  // All text settings //
  const fontSizes = ["32px", "38px", "44px", "60px"];
  const fontFamilies = [
    "Caveat",
    "Croissant One",
    "Dancing Script",
    "Inter",
    "Lato",
    "Playfair Display",
  ];
  // //

  // User Uploaded Image Variables //
  const [userImagePosition, setUserImagePosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [userImage, setUserImage] = useState<string | null>(null);

  // //

  // BackDrop And Wallpaper Variables //

  const [borderColor, setBorderColor] = useState("white");

  const [backdropImage, setBackdropImage] = useState<string>(BlackBackDrop);
  const backdropOptions = [
    BlackBackDrop,
    GoldBackDrop,
    GreenBackDrop,
    SilverBackDrop,
    WhiteBackDrop,
    BrownGlitterBackDrop,
  ];
  const backdropLabels = ["Black", "Gold", "Green", "Silver", "White", "Brown"];

  const [wallpaperImage, setWallpaperImage] = useState<string | undefined>(
    undefined
  );
  const wallpaperOptions = [
    "",
    Pattern1,
    Pattern2,
    Pattern3,
    Pattern4,
    Pattern5,
    Pattern6,
    Pattern7,
  ];

  const wallpaperLabels = [
    "None",
    "Rainbow Glass",
    "Black Glass",
    "Colorful Squares",
    "White Roses",
    "Flowers",
    "Cubes",
    "Blue Floral",
  ];

  // //

  // User Image Functions & Variables //
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

  const updateUserImagePosition = (updatedValue: { x: number; y: number }) => {
    setUserImagePosition(updatedValue);
  };

  const handleDeleteImage = () => {
    setUserImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input
    }
  };

  // //

  const updateMainTextYPosition = (updatedValue: number) => {
    setMainTextYPosition(updatedValue);
  };

  const updateSecondaryTextYPosition = (updatedValue: number) => {
    setSecondaryTextYPosition(updatedValue);
  };

  const handleTextShadowColorChange = (newColor: string) => {
    setTextShadowColor(newColor);
  };

  const handleBorderColorChange = (newColor: string) => {
    setBorderColor(newColor);
  };

  const handleSecondaryTextShadowColorChange = (newColor: string) => {
    setSecondaryTextShadowColor(newColor);
  };

  const handleAddSecondaryText = () => {
    setWantSecondaryText(true);
  };

  const handleSecondaryTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSecondaryText(event.target.value);
  };

  const handleColorChange = (newColor: string) => {
    setCanvasColor(newColor);
  };

  const handleMainTextColorChange = (newColor: string) => {
    setMainTextColor(newColor);
  };

  const handleSecondaryTextColorChange = (newColor: string) => {
    setSecondaryTextColor(newColor);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMainText(event.target.value);
  };

  const handleFontSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFontSize(parseInt(event.target.value));
  };

  const handleSecondaryFontSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSecondaryFontSize(parseInt(event.target.value));
  };

  const handleFontFamilyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFontFamily(event.target.value);
  };

  const handleSecondaryFontFamilyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSecondaryFontFamily(event.target.value);
  };

  type SectionVisibility = {
    backdesign: boolean;
    mainText: boolean;
    secondaryText: boolean;
    [key: string]: boolean;
  };

  const [sectionsVisible, setSectionsVisible] = useState<SectionVisibility>({
    backdesign: false,
    mainText: false,
    secondaryText: false,
  });

  const [isFlipped, setIsFlipped] = useState(false);

  const toggleSection = (section: keyof SectionVisibility) => {
    setIsFlipped(!isFlipped);
    setSectionsVisible((prevVisibility) => {
      const updatedVisibility: SectionVisibility = { ...prevVisibility }; // Create a copy of the previous state

      updatedVisibility[section] = !prevVisibility[section]; // Toggle the section's visibility

      return updatedVisibility;
    });
  };

  const handleDeleteSecondaryText = () => {
    setWantSecondaryText(false);
  };

  // Canvas Image Downloading //

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

  function drawUsersOwnImage(
    userImg: HTMLImageElement,
    ctx: CanvasRenderingContext2D
  ) {
    const imgHeight = 100 * 2.5;
    const aspectRatio = userImg.width / userImg.height;
    const imgWidth = imgHeight * aspectRatio;
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
  }

  function drawSecondaryText(ctx: CanvasRenderingContext2D) {
    console.log("drawing the secondary text");
    // Draw text on the canvas
    ctx.fillStyle = secondaryTextColor;
    ctx.font = `${secondaryFontSize + 6}px ${secondaryFontFamily}`;
    ctx.textAlign = "center";
    const textLines = getLines(ctx, secondaryText, width);
    if (addSecondaryTextShadow) {
      ctx.shadowColor = secondaryTextShadowColor;
      ctx.shadowBlur = 2 * 2.5;
      ctx.shadowOffsetY = 2 * 2.5;
      ctx.shadowOffsetX = 2 * 2.5;
    }
    for (let i = 0; i < textLines.length; i++) {
      const line = textLines[i];
      const lineHeight = 1.5 * secondaryFontSize;
      ctx.fillText(
        line,
        width / 2,
        secondaryTextYPosition * 2.5 + 50 + i * lineHeight
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

  function drawBorderSquares(
    ctx: CanvasRenderingContext2D,
    borderColor: string
  ) {
    ctx.fillStyle = borderColor;
    ctx.fillRect(31, 27 * 2.5, 192 * 2.5, 111 * 2.5);
    ctx.fillRect(31, 144 * 2.5, 192 * 2.5, 111 * 2.5);
    ctx.fillRect(31, 260 * 2.5, 192 * 2.5, 111 * 2.5);
    ctx.fillRect(31, 377 * 2.5, 192 * 2.5, 111 * 2.5);
  }

  function downloadImage() {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      ctx.globalAlpha = 0.75;
      // Draw the wallpaperImage if it is defined
      if (wallpaperImage) {
        const wallpaperImg = new Image();
        wallpaperImg.onload = () => {
          ctx.drawImage(
            wallpaperImg,
            // Adjust the coordinates and size as needed
            0,
            0,
            width,
            height
          );

          ctx.globalAlpha = 1;

          // 4 square photos //
          // Draw the selected overlay image
          const overlayImg = new Image();
          overlayImg.onload = () => {
            // Fill the canvas with the selected color

            // Draw Border Squares //
            drawBorderSquares(ctx, borderColor);
            // //

            ctx.drawImage(overlayImg, 0, 0, width, height);

            // Draw the user-uploaded image at the specified position if it exists
            if (userImage) {
              const userImg = new Image();
              userImg.onload = () => {
                drawUsersOwnImage(userImg, ctx);

                // Draw Text on screen
                drawText(ctx);
                if (wantSecondaryText) {
                  drawSecondaryText(ctx);
                }

                // Download Final Photo
                downloadFinalImageLink(canvas);
              };
              userImg.src = userImage;
            } else {
              // If no userImage is defined, continue with drawing text and downloading
              // Draw Text on screen
              drawText(ctx);

              if (wantSecondaryText) {
                drawSecondaryText(ctx);
              }

              // Download Final Photo
              downloadFinalImageLink(canvas);
            }
          };
          overlayImg.src = backdropImage;
        };
        wallpaperImg.src = wallpaperImage;
      } else {
        ctx.globalAlpha = 1;
        // If no wallpaperImage is defined, continue with drawing the overlay image
        const overlayImg = new Image();
        overlayImg.onload = () => {
          // Fill the canvas with the selected color
          ctx.fillStyle = canvasColor;
          ctx.fillRect(0, 0, width, height);

          // Draw Border Squares //
          drawBorderSquares(ctx, borderColor);
          // //

          ctx.drawImage(overlayImg, 0, 0, width, height);

          // Draw the user-uploaded image at the specified position if it exists
          if (userImage) {
            const userImg = new Image();
            userImg.onload = () => {
              drawUsersOwnImage(userImg, ctx);

              // Draw Text on screen
              drawText(ctx);
              if (wantSecondaryText) {
                drawSecondaryText(ctx);
              }

              // Download Final Photo
              downloadFinalImageLink(canvas);
            };
            userImg.src = userImage;
          } else {
            // If no userImage is defined, continue with drawing text and downloading
            // Draw Text on screen
            drawText(ctx);
            if (wantSecondaryText) {
              drawSecondaryText(ctx);
            }

            // Download Final Photo
            downloadFinalImageLink(canvas);
          }
        };
        overlayImg.src = backdropImage;
      }
    }
  }

  //

  return (
    <div className="app">
      <div id="titleCard">
        <div id="titleCardContents">
          <div className="nameAndLogo">
            <span
              className="iconify optionsIcon smilie"
              data-icon="solar:emoji-funny-square-linear"
            ></span>
            <h1 id="appTitle">Photobooth Layout Maker</h1>
          </div>
          <div className="editedBy">
            <p>Created by</p>
            <h1>Sergio Hernandez</h1>
          </div>
        </div>
      </div>
      <div className="mainWindow">
        <div className="workshop">
          <div className="editingToolsLeft">
            <h2
              className="optionsTitle"
              onClick={() => toggleSection("mainText")}
            >
              <span
                className="iconify optionsIcon"
                data-icon="basil:edit-outline"
              ></span>
              <span className="goldText">Primary Text</span>
              <span
                className={`carot ${
                  sectionsVisible["mainText"] ? "flipped" : ""
                }`}
              ></span>
            </h2>
            <div
              className={`tool-section ${
                !sectionsVisible.mainText ? "hidden" : ""
              }`}
            >
              <div className="flexRow">
                <h3>Text</h3>
                <input
                  className="textBox"
                  type="text"
                  value={mainText}
                  onChange={handleTextChange}
                  placeholder="Enter text here"
                />
              </div>
              <div className="flexRow">
                <h3 onClick={() => toggleSection("mainText")}>
                  Change Text Color
                </h3>
                <ColorPicker
                  onChange={handleMainTextColorChange}
                  color={mainTextColor}
                />
              </div>
              <div className="flexRow">
                <h3>Shadows</h3>
                <input
                  type="checkbox"
                  checked={addTextShadow}
                  onChange={() => setAddTextShadow(!addTextShadow)}
                />
              </div>
              <div className="flexRow">
                <h3>Text Effects Color</h3>
                <ColorPicker
                  onChange={handleTextShadowColorChange}
                  color={textShadowColor}
                />
              </div>
              <div className="flexRow">
                <h3>Text Size</h3>
                <div>
                  <select
                    className="selectBox"
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
              </div>
              <div className="flexRow">
                <h3>Font Family</h3>
                <select
                  className="selectBox"
                  onChange={handleFontFamilyChange}
                  value={fontFamily}
                >
                  {fontFamilies.map((family) => (
                    <option id="fontFamilyOption" key={family} value={family}>
                      {family}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <h2
              className="optionsTitle"
              onClick={() => toggleSection("secondaryText")}
            >
              <span
                className="iconify optionsIcon"
                data-icon="typcn:edit"
              ></span>
              <span className="goldText">Secondary Text</span>
              <span
                className={`carot ${
                  sectionsVisible["secondaryText"] ? "flipped" : ""
                }`}
              ></span>
            </h2>
            <div
              className={`tool-section ${
                !sectionsVisible.secondaryText ? "hidden" : ""
              }`}
            >
              {!wantSecondaryText && (
                <>
                  <button
                    className="settingsButton"
                    id="addSecondaryText"
                    onClick={handleAddSecondaryText}
                  >
                    Add A Tagline
                  </button>
                </>
              )}
              {wantSecondaryText && (
                <>
                  <div id="textAndButton">
                    <input
                      className="textBox"
                      type="text"
                      value={secondaryText}
                      onChange={handleSecondaryTextChange}
                      placeholder="Enter text here"
                    />
                    <button
                      className="settingsButton deleteButton"
                      onClick={handleDeleteSecondaryText}
                    >
                      Delete Text
                      <span
                        className="iconify deleteIcon"
                        data-icon="material-symbols:delete"
                      ></span>
                    </button>
                  </div>
                  <div className="flexRow">
                    <h3>Change Text Color</h3>
                    <ColorPicker
                      onChange={handleSecondaryTextColorChange}
                      color={mainTextColor}
                    />
                  </div>
                  <div className="flexRow">
                    <h3>Shadows</h3>
                    <input
                      type="checkbox"
                      checked={addSecondaryTextShadow}
                      onChange={() =>
                        setAddSecondaryTextShadow(!addSecondaryTextShadow)
                      }
                    />
                  </div>
                  <div className="flexRow">
                    <h3>Text Effects Color</h3>
                    <ColorPicker
                      onChange={handleSecondaryTextShadowColorChange}
                      color={secondaryTextShadowColor}
                    />
                  </div>
                  <div className="flexRow">
                    <h3>Text Size</h3>
                    <div>
                      <select
                        className="selectBox"
                        onChange={handleSecondaryFontSizeChange}
                        value={`${secondaryFontSize}px`}
                      >
                        {fontSizes.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flexRow">
                    <h3>Font Family</h3>
                    <select
                      className="selectBox"
                      onChange={handleSecondaryFontFamilyChange}
                      value={secondaryFontFamily}
                    >
                      {fontFamilies.map((family) => (
                        <option key={family} value={family}>
                          {family}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>
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
            wantSecondaryText={wantSecondaryText}
            secondaryText={secondaryText}
            updateSecondaryTextYPosition={updateSecondaryTextYPosition}
            secondaryFontSize={secondaryFontSize / 2.2}
            secondaryFontFamily={secondaryFontFamily}
            addSecondaryTextShadow={addSecondaryTextShadow}
            secondaryTextShadowColor={secondaryTextShadowColor}
            secondaryTextColor={secondaryTextColor}
            borderColor={borderColor}
          />
          <div className="editingToolsRight">
            <h2
              className="optionsTitle"
              onClick={() => toggleSection("backdesign")}
            >
              <span
                className="iconify optionsIcon"
                data-icon="ri:image-fill"
              ></span>
              <span className="goldText">Image and Design</span>
              <span
                className={`carot ${
                  sectionsVisible["backdesign"] ? "flipped" : ""
                }`}
              ></span>
            </h2>
            <Backdesign
              sectionsVisible={sectionsVisible}
              toggleSection={toggleSection}
              setBackdropImage={setBackdropImage}
              backdropImage={backdropImage}
              backdropOptions={backdropOptions}
              backdropLabels={backdropLabels}
              setWallpaperImage={setWallpaperImage}
              wallpaperImage={wallpaperImage}
              wallpaperOptions={wallpaperOptions}
              wallpaperLabels={wallpaperLabels}
              handleColorChange={handleColorChange}
              canvasColor={canvasColor}
              handleBorderColorChange={handleBorderColorChange}
              borderColor={borderColor}
              handleImageUpload={handleImageUpload}
              fileInputRef={fileInputRef}
              userImage={userImage}
              handleDeleteImage={handleDeleteImage}
            />
            <div className="downloadArea">
              <span
                className="iconify optionsIcon"
                data-icon="fluent:save-image-20-filled"
              ></span>
              <span className="goldText">Download Image</span>
              <button
                className="settingsButton downloadButton"
                onClick={() => downloadImage()}
              >
                <span
                  className="iconify iconifySkills"
                  data-icon="material-symbols:download"
                ></span>
                <span className="exportText">Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
