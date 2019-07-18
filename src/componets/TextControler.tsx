import * as React from "react";

interface TextControlerProps {
  setText(event: React.ChangeEvent<HTMLTextAreaElement>): void;
}

export const TextControler: React.FC<TextControlerProps> = props => {
  return (
    <div className="textContents">
      <h2>글씨 등록</h2>
      <textarea onChange={props.setText} />
    </div>
  );
};
