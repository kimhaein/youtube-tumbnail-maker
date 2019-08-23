import * as React from "react";
import { HuePicker, TwitterPicker } from "react-color";
import { IEventTarget } from "../store";

interface BgColorControlerProps {
  bgColor: { r: number; g: number; b: number; a: number };
  fontColor: object;
  width: string;
  height: string;
  colorPicker: string[];
  changeSize({ target }: IEventTarget): void;
  setBgImg({ target }: React.ChangeEvent<HTMLInputElement>): void;
  changeBgColor({ rgb }: { rgb: object }): void;
  changeFontColor({ rgb }: { rgb: object }): void;
  resetStyle(event: React.MouseEvent<HTMLButtonElement>):void;
}

export const BgColorControler: React.FC<BgColorControlerProps> = props => {
  return (
    <div className="bgControler">
      <div className="bgColorWrap">
        <h2>
          BACKGROUND ㅣ <button className="bg" onClick={props.resetStyle}>reset</button>
        </h2>
        <div className="row">
          <div className="inputWrap">
            <label>Width</label>
            <input type="number" name="width" onChange={props.changeSize} value={props.width} />
          </div>
          <div className="inputWrap">
            <label>Height</label>
            <input type="number" name="height" onChange={props.changeSize} value={props.height} />
          </div>
        </div>
        <div className="inputWrap">
          <label>Image</label>
          <input className="w100" type="file" onChange={props.setBgImg} />
        </div>
        <div className="colorControler">
          <TwitterPicker width={"100%"} color={props.bgColor} triangle={"hide"}  colors={props.colorPicker} onChangeComplete={props.changeBgColor} />
          <HuePicker width={"97%"} color={props.bgColor} onChangeComplete={props.changeBgColor} />
        </div>
      </div>
    </div>
  );
};
