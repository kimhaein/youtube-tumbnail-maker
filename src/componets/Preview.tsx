import * as React from "react";

interface PreviewProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  getPosition(event: React.MouseEvent): void;
}

export const Preview: React.FC<PreviewProps> = props => {
  return (
    <div className="perview">
      <canvas ref={props.canvasRef} onClick={props.getPosition} />
    </div>
  );
};
