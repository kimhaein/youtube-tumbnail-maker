import * as React from "react";
import { HuePicker, AlphaPicker } from "react-color";
import { IEventTarget } from "../store";

interface BgColorControlerProps {
  bgColor: { r: number; g: number; b: number; a: number };
  fontColor: object;
  width: string;
  height: string;
  changeSize({ target }: IEventTarget): void;
  setBgImg({ target }: React.ChangeEvent<HTMLInputElement>): void;
  changeBgColor({ rgb }: { rgb: object }): void;
  changeFontColor({ rgb }: { rgb: object }): void;
}

export const BgColorControler: React.FC<BgColorControlerProps> = props => {
  return (
    <div className="bgControler">
      <div className="bgColorWrap">
        <h2>
          BACKGROUND ㅣ <button>reset</button>
        </h2>
        <div className="row">
          <div className="inputWrap">
            <label>Width</label>
            <input type="number" name="width" onChange={props.changeSize} defaultValue={props.width} />
          </div>
          <div className="inputWrap">
            <label>Height</label>
            <input type="number" name="height" onChange={props.changeSize} defaultValue={props.height} />
          </div>
        </div>
        <div className="inputWrap">
          <label>Image</label>
          <input className="w100" type="file" onChange={props.setBgImg} />
        </div>
        <div className="colorControler">
          <HuePicker width={"97%"} color={props.bgColor} onChangeComplete={props.changeBgColor} />
          <AlphaPicker width={"97%"} color={props.bgColor} onChangeComplete={props.changeBgColor} />
        </div>
      </div>
    </div>
  );
};
