import * as React from "react";
import { HuePicker, TwitterPicker } from "react-color";

interface FontColorControlerProps {
  text: string;
  fontColor: object;
  fontSize: string;
  fontFamily: string;
  colorPicker: string[];
  setText(event: React.ChangeEvent<HTMLInputElement>): void;
  changeFontColor({ rgb }: { rgb: object }): void;
  changeFontSize(event: React.ChangeEvent<HTMLInputElement>): void;
  changeFontFamily(event: React.ChangeEvent<HTMLSelectElement>): void;
  resetStyle(event: React.MouseEvent<HTMLButtonElement>):void;
}

export const FontColorControler: React.FC<FontColorControlerProps> = props => {
  return (
    <div className="bgControler">
      <div className="bgColorWrap">
        <h2>
          FONT ㅣ <button className="font" onClick={props.resetStyle}>reset</button>
        </h2>
        <div className="row">
          <div className="inputWrap">
            <label>Font-Size</label>
            <input type="number" name="fontSize" onChange={props.changeFontSize} value={props.fontSize} />
          </div>
          <div className="inputWrap">
            <label>Font</label>
            <select value={props.fontFamily} onChange={props.changeFontFamily}>
              <option value="Nanum Gothic">Nanum Gothic(K)</option>
              <option value="Black Han Sans">Black Han Sans(K)</option>
              <option value="Song Myung">Song Myung(K)</option>
              <option value="Do Hyeon">Do Hyeon(K)</option>
              <option value="Jua">Jua(K)</option>
              <option value="Work Sans">Work Sans(E)</option>
              <option value="Merienda">Merienda(E)</option>
            </select>
          </div>
        </div>
        <div className="inputWrap">
          <label>Text</label>
          <input className="w100" type="text" name="text" onChange={props.setText} value={props.text} />
        </div>
        <div className="colorControler">
          <TwitterPicker width={"100%"} color={props.fontColor} triangle={"hide"}  colors={props.colorPicker} onChangeComplete={props.changeFontColor} />
          <HuePicker width={"97%"} color={props.fontColor} onChangeComplete={props.changeFontColor} />
        </div>
      </div>
    </div>
  );
};
