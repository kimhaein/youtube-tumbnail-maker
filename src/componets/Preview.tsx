import * as React from "react";

interface PreviewProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  getPosition(event: React.MouseEvent): void;
}

export const Preview: React.FC<PreviewProps> = props => {
  return (
    <div className="perview">
      <canvas ref={props.canvasRef} onClick={props.getPosition} />
      <p>* 해당 영역을 클릭하면 글자의 위치를 지정할 수 있습니다.</p>
      <p>* 해상도를 유지하기 위해 입력하신 크기에 2배 이미지로 다운로드 됩니다.</p>
    </div>
  );
};
