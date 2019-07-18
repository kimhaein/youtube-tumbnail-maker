import React, { Component } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { IStoreState } from "../store";
import { updateWidth, updatePostion, updateBgColor, updateHeight, updateText, updateFontColor } from "../actions";

import { Preview, SizeControler, BgColorControler, TextControler, FontColorControler, BgImgControler, DownloadBtn } from "../componets";

interface IProps {
  width: string;
  height: string;
  imgTarget: object;
  bgColor: { r: number; g: number; b: number; a: number };
  fontColor: { r: number; g: number; b: number; a: number };
  text: string;
  fontBgColor: { r: number; g: number; b: number; a: number };
  positionX: number;
  positionY: number;
  href: string;
  updateWidth?(width: string): void;
  updateHeight?(height: string): void;
  updateBgColor?(bgColor: object): void;
  updatePostion?(positionX: number, positionY: number): void;
  updateText?(text: string): void;
  updateFontColor?(fontColor: object): void;
}

const mapStateToProps = (state: IStoreState) => {
  // store 의 state 를 컴포넌트의 props 에 매핑
  return {
    width: state.width,
    height: state.height,
    imgTarget: state.imgTarget,
    bgColor: state.bgColor,
    fontColor: state.fontColor,
    text: state.text,
    fontBgColor: state.fontBgColor,
    positionX: state.positionX,
    positionY: state.positionY,
    href: state.href
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  // 컴포넌트의 특정 함수형 props 를 실행 했을 때, 개발자가 지정한 action을 dispatch 하도록 설정
  updateWidth: width => dispatch(updateWidth(width)),
  updateHeight: height => dispatch(updateHeight(height)),
  updateBgColor: bgColor => dispatch(updateBgColor(bgColor)),
  updatePostion: (positionX, positionY) => dispatch(updatePostion(positionX, positionY)),
  updateText: text => dispatch(updateText(text)),
  updateFontColor: fontColor => dispatch(updateFontColor(fontColor))
});
export class BannerMaker extends Component<IProps, {}> {
  private canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

  shouldComponentUpdate(nextProps, nextState) {
    // if (this.state.href === nextState.href) return false;
    return true;
  }

  componentDidMount() {
    this.renderCanvas();
  }

  componentDidUpdate() {
    this.renderCanvas();
  }

  renderCanvas = () => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = +this.props.width;
    canvas.height = +this.props.height;

    if (Object.keys(this.props.imgTarget).length === 0) {
      const { r, g, b, a } = this.props.bgColor;
      ctx.fillStyle = `rgba(${[r, g, b, a]})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      this.randerBgImg(this.props.imgTarget);
    }
    this.renderText();
  };

  // test 업데이트
  setText = event => {
    this.props.updateText(event.target.value);
  };

  // test 적용
  renderText = () => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { r, g, b, a } = this.props.fontColor;
    ctx.font = "30px Georgia";
    ctx.fillStyle = `rgba(${[r, g, b, a]})`;
    ctx.textAlign = "left"; // 가로 가운데 정렬
    ctx.textBaseline = "top";
    ctx.fillText(this.props.text, this.props.positionX, this.props.positionY);
  };

  // 배경색 업데이트
  changeBgColor = ({ rgb }) => {
    this.props.updateBgColor(rgb);
  };

  // 글씨색 업데이트
  changeFontColor = ({ rgb }) => {
    this.props.updateFontColor(rgb);
  };

  // 배경 이미지 업데이트
  setBgImg = event => {
    this.randerBgImg(event.target);
  };

  // 배경 이미지 적용
  randerBgImg = target => {
    const reader = new FileReader();
    const img = new Image();
    const canvas = this.canvasRef.current;
    if (!reader) return false;
    reader.onload = () => {
      const ctx = canvas.getContext("2d");
      img.onload = () => {
        canvas.width = +this.props.width;
        canvas.height = +this.props.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // 글씨 랜더
        this.renderText();
      };

      if (typeof reader.result === "string") {
        img.src = reader.result;
      } else {
        img.src = reader.result.toString();
      }
    };
    reader.readAsDataURL(target.files[0]);
  };

  // 사이즈 적용
  changeSize = ({ target }) => {
    switch (target.name) {
      case "width":
        this.props.updateWidth(target.value);
        break;
      case "height":
        this.props.updateHeight(target.value);
        break;
      default:
        this.props.updateWidth(this.props.width);
        this.props.updateHeight(this.props.height);
        break;
    }
  };

  // 스티커 설정
  setSticker = ({ target }) => {};

  // 이미지 다운로드
  onDownLoad = ({ target }) => {
    const href = this.canvasRef.current.toDataURL();
    target.href = href;
    target.download = "banner_img.png";
  };

  // 위치값 업데이트
  getPosition = e => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.props.updatePostion(x, y);
  };

  render() {
    return (
      <React.Fragment>
        <div className="header">
          <h1>Banner Maker</h1>
        </div>
        <div className="mainWrap">
          <Preview canvasRef={this.canvasRef} getPosition={this.getPosition} />
          <SizeControler width={this.props.width} height={this.props.height} changeSize={this.changeSize} />
          <BgImgControler setBgImg={this.setBgImg} />
          <BgColorControler
            bgColor={this.props.bgColor}
            fontColor={this.props.fontColor}
            changeBgColor={this.changeBgColor}
            changeFontColor={this.changeFontColor}
          />
          <TextControler setText={this.setText} />
          <DownloadBtn onDownLoad={this.onDownLoad} />
        </div>
      </React.Fragment>
    );
  }
}

export const BannerMakerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BannerMaker);
