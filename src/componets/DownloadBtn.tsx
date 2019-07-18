import * as React from "react";

interface DownloadBtnProps {
  onDownLoad({ target }: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

export const DownloadBtn: React.FC<DownloadBtnProps> = props => {
  return (
    <div className="downLoadBtn">
      <button onClick={props.onDownLoad}>다운로드</button>
    </div>
  );
};
