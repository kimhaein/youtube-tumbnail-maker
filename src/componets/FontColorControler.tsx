import * as React from "react";
import { HuePicker, AlphaPicker } from "react-color";

interface FontColorControlerProps {
  text: string;
  fontColor: object;
  fontSize: string;
  fontFamily: string;
  setText(event: React.ChangeEvent<HTMLInputElement>): void;
  changeFontColor({ rgb }: { rgb: object }): void;
  changeFontSize(event: React.ChangeEvent<HTMLInputElement>): void;
  changeFontFamily(event: React.ChangeEvent<HTMLSelectElement>): void;
}

export const FontColorControler: React.FC<FontColorControlerProps> = props => {
  return (
    <div className="bgControler">
      <div className="bgColorWrap">
        <h2>
          FONT ㅣ <button>reset</button>
        </h2>
        <div className="row">
          <div className="inputWrap">
            <label>Font-Size</label>
            <input type="number" name="fontSize" onChange={props.changeFontSize} defaultValue={props.fontSize} />
          </div>
          <div className="inputWrap">
            <label>Font</label>
            <select value={props.fontFamily} onChange={props.changeFontFamily}>
              <option value="Noto Sans KR">Noto Sans KR</option>
              <option value="Black Han Sans">Black Han Sans</option>
              <option value="Nanum Gothic">Nanum Gothic</option>
            </select>
          </div>
        </div>
        <div className="inputWrap">
          <label>Text</label>
          <input type="text" name="text" onChange={props.setText} defaultValue={props.text} />
        </div>
        <div className="colorControler">
          <HuePicker width={"97%"} color={props.fontColor} onChangeComplete={props.changeFontColor} />
          <AlphaPicker width={"97%"} color={props.fontColor} onChangeComplete={props.changeFontColor} />
        </div>
      </div>
    </div>
  );
};
