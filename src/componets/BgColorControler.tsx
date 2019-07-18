import * as React from "react";
import { HuePicker, AlphaPicker } from "react-color";

interface BgColorControlerProps {
  bgColor: { r: number; g: number; b: number; a: number };
  fontColor: object;
  changeBgColor({ rgb }: { rgb: object }): void;
  changeFontColor({ rgb }: { rgb: object }): void;
}

export const BgColorControler: React.FC<BgColorControlerProps> = props => {
  return (
    <div className="colorControler">
      <div>
        <h2>배경색 지정</h2>
        <div className="bgColorWrap">
          <HuePicker color={props.bgColor} onChangeComplete={props.changeBgColor} />
          <AlphaPicker color={props.bgColor} onChangeComplete={props.changeBgColor} />
        </div>
      </div>
      <div>
        <h2>글씨색 지정</h2>
        <div className="bgColorWrap">
          <HuePicker color={props.fontColor} onChangeComplete={props.changeFontColor} />
          <AlphaPicker color={props.fontColor} onChangeComplete={props.changeFontColor} />
        </div>
      </div>
    </div>
  );
};
