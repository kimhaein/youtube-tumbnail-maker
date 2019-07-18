import * as React from "react";
import { ChromePicker } from "react-color";

interface FontColorControlerProps {
  fontColor: object;
  changeFontColor({ rgb }: { rgb: object }): void;
}

export const FontColorControler: React.FC<FontColorControlerProps> = props => {
  return (
    <div className="textColor">
      <h2>글씨색 지정</h2>
      <ChromePicker color={props.fontColor} onChangeComplete={props.changeFontColor} />
    </div>
  );
};
