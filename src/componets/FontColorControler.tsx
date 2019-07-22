import * as React from "react";
import { HuePicker, AlphaPicker } from "react-color";

interface FontColorControlerProps {
  text: string;
  fontColor: object;
  setText(event: React.ChangeEvent<HTMLInputElement>): void;
  changeFontColor({ rgb }: { rgb: object }): void;
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
            <input type="text" name="fontSize" />
          </div>
          <div className="inputWrap">
            <label>Font</label>
            <select>
              <option>Noto Sans KR</option>
              <option>Black Han Sans</option>
              <option>1</option>
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
