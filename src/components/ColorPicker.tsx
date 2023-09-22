import React from "react";

interface ColorPickerProps {
  onChange: (color: string) => void;
  color: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onChange, color }) => {
  return (
    <input
      type="color"
      value={color}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default ColorPicker;
