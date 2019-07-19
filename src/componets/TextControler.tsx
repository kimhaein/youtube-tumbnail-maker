import * as React from "react";

interface TextControlerProps {
  text: string;
  setText(event: React.ChangeEvent<HTMLInputElement>): void;
}

export const TextControler: React.FC<TextControlerProps> = props => {
  return (
    <div className="textContents">
      <div className="inputWrap">
        <label>글씨 등록</label>
        <input type="text" name="text" onChange={props.setText} defaultValue={props.text} />
      </div>
    </div>
  );
};
