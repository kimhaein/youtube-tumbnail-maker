import * as React from "react";
import { IEventTarget } from "../store";

interface SizeControlProps {
  width: string;
  height: string;
  changeSize({ target }: IEventTarget): void;
}

export const SizeControler: React.FC<SizeControlProps> = props => {
  return (
    <div className="sizeControler">
      <div className="inputWrap">
        <label>Width</label>
        <input type="number" name="width" onChange={props.changeSize} defaultValue={props.width} />
      </div>
      <div className="inputWrap">
        <label>Height</label>
        <input type="number" name="height" onChange={props.changeSize} defaultValue={props.height} />
      </div>
    </div>
  );
};
