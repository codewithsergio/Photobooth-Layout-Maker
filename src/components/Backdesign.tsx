import React from "react";
import ColorPicker from "../components/ColorPicker";

type SectionVisibility = {
  backdesign: boolean;
  mainText: boolean;
  secondaryText: boolean;
  [key: string]: boolean;
};

interface BackdesignProps {
  sectionsVisible: SectionVisibility;
  toggleSection: (section: keyof SectionVisibility) => void;
  setBackdropImage: React.Dispatch<React.SetStateAction<string>>;
  backdropImage: string;
  backdropOptions: string[];
  backdropLabels: string[];
  setWallpaperImage: React.Dispatch<React.SetStateAction<string | undefined>>;
  wallpaperImage: string | undefined;
  wallpaperOptions: string[];
  wallpaperLabels: string[];
  handleColorChange: (newColor: string) => void;
  canvasColor: string;
  handleBorderColorChange: (newColor: string) => void;
  borderColor: string;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
  userImage: string | null;
  handleDeleteImage: () => void;
}

const Backdesign: React.FC<BackdesignProps> = ({
  sectionsVisible,
  toggleSection,
  setBackdropImage,
  backdropImage,
  backdropOptions,
  backdropLabels,
  setWallpaperImage,
  wallpaperImage,
  wallpaperOptions,
  wallpaperLabels,
  handleColorChange,
  canvasColor,
  handleBorderColorChange,
  borderColor,
  handleImageUpload,
  fileInputRef,
  userImage,
  handleDeleteImage,
}) => {
  return (
    <div
      className={`tool-section ${!sectionsVisible.backdesign ? "hidden" : ""}`}
    >
      <div className="flexRow">
        <h3 onClick={() => toggleSection("backdesign")}>Backdrop</h3>
        <select
          className="textBox"
          onChange={(e) => setBackdropImage(e.target.value)}
          value={backdropImage}
        >
          {backdropOptions.map((option, index) => (
            <option key={index} value={option}>
              {backdropLabels[index]}
            </option>
          ))}
        </select>
      </div>
      <div className="flexRow">
        <h3>Wallpaper</h3>
        <select
          className="textBox"
          onChange={(e) => setWallpaperImage(e.target.value)}
          value={wallpaperImage}
        >
          {wallpaperOptions.map((option, index) => (
            <option key={index} value={option}>
              {wallpaperLabels[index]}
            </option>
          ))}
        </select>
      </div>
      <div className="flexRow">
        <h3>Solid Background color</h3>
        <ColorPicker onChange={handleColorChange} color={canvasColor} />
      </div>
      <div className="flexRow">
        <h3>Border color</h3>
        <ColorPicker onChange={handleBorderColorChange} color={borderColor} />
      </div>
      <div className="flexRow2">
        <h3>Upload A Photo</h3>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
        />
        {userImage && (
          <button id="deleteButton" onClick={handleDeleteImage}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Backdesign;
