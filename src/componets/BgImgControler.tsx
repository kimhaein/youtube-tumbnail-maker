import * as React from "react";

interface BgImgControlerProps {
  setBgImg({ target }: React.ChangeEvent<HTMLInputElement>): void;
}

export const BgImgControler: React.FC<BgImgControlerProps> = props => {
  return (
    <div className="bgImg">
      <div className="inputWrap">
        <label>배경 이미지 등록</label>
        <input type="file" onChange={props.setBgImg} />
      </div>
    </div>
  );
};
