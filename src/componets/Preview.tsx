import * as React from "react";

interface PreviewProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  getPosition(event: React.MouseEvent): void;
}

export const Preview: React.FC<PreviewProps> = props => {
  return (
    <div className="perview">
      <canvas ref={props.canvasRef} width={100} height={100} onClick={props.getPosition} />
    </div>
  );
};
