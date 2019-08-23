import React, { Component } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { IStoreState } from "../store";
import { initializeState as init} from "../reducers"
import {
  updateWidth,
  updatePostion,
  updateBgColor,
  updateimgTarget,
  updateHeight,
  updateText,
  updateFontColor,
  updateFontSize,
  updateFontFamily
} from "../actions";

import { Preview, BgColorControler, FontColorControler, DownloadBtn } from "../componets";

interface IProps {
  width: string;
  height: string;
  imgTarget: {
    files: object[];
  };
  bgColor: { r: number; g: number; b: number; a: number };
  fontColor: { r: number; g: number; b: number; a: number };
  fontSize: string;
  fontFamily: string;
  textList: string[];
  text: string;
  fontBgColor: { r: number; g: number; b: number; a: number };
  positionX: number;
  positionY: number;
  href: string;
  colorPicker: string[];
  updateWidth?(width: string): void;
  updateHeight?(height: string): void;
  updateBgColor?(bgColor: object): void;
  updateimgTarget?(imgTarget: object): void;
  updatePostion?(positionX: number, positionY: number): void;
  updateText?(text: string): void;
  updateFontColor?(fontColor: object): void;
  updateFontSize?(fontSize: number): void;
  updateFontFamily?(fontFamily: string): void;
}

const mapStateToProps = (state: IStoreState) => {
  // store 의 state 를 컴포넌트의 props 에 매핑
  return {
    width: state.width,
    height: state.height,
    imgTarget: state.imgTarget,
    bgColor: state.bgColor,
    fontColor: state.fontColor,
    fontSize: state.fontSize,
    fontFamily: state.fontFamily,
    textList: state.textList,
    text: state.text,
    fontBgColor: state.fontBgColor,
    positionX: state.positionX,
    positionY: state.positionY,
    href: state.href,
    colorPicker: state.colorPicker
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  // 컴포넌트의 특정 함수형 props 를 실행 했을 때, 개발자가 지정한 action을 dispatch 하도록 설정
  updateWidth: width => dispatch(updateWidth(width)),
  updateHeight: height => dispatch(updateHeight(height)),
  updateBgColor: bgColor => dispatch(updateBgColor(bgColor)),
  updateimgTarget: imgTarget => dispatch(updateimgTarget(imgTarget)),
  updatePostion: (positionX, positionY) => dispatch(updatePostion(positionX, positionY)),
  updateText: text => dispatch(updateText(text)),
  updateFontColor: fontColor => dispatch(updateFontColor(fontColor)),
  updateFontSize: fontSize => dispatch(updateFontSize(fontSize)),
  updateFontFamily: fontFamily => dispatch(updateFontFamily(fontFamily))
});
export class BannerMaker extends Component<IProps, {}> {
  private canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

  // shouldComponentUpdate(nextProps, nextState) {
  //   // if (this.state.href === nextState.href) return false;
  //   return true;
  // }

  componentDidMount() {
    this.renderCanvas();
  }

  componentDidUpdate() {
    this.renderCanvas();
  }

  renderCanvas = () => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = +this.props.width * 2;
    canvas.height = +this.props.height * 2;
    canvas.style.width = `${this.props.width}px`;
    canvas.style.height = `${this.props.height}px`;
    if (this.props.imgTarget.files.length === 0 || !this.props.imgTarget) {
      const { r, g, b, a } = this.props.bgColor;
      ctx.fillStyle = `rgba(${[r, g, b, a]})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.renderText();
    } else {
      this.randerBgImg(this.props.imgTarget);
    }
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
    ctx.font = `${+this.props.fontSize * 2}px ${this.props.fontFamily}`;
    ctx.fillStyle = `rgba(${[r, g, b, a]})`;
    ctx.fillText(this.props.text, this.props.positionX, this.props.positionY);
  };

  changeFontSize = event => {
    this.props.updateFontSize(event.target.value);
  };

  changeFontFamily = event => {
    this.props.updateFontFamily(event.target.value);
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
    if (!target.files) return false;
    const reader = new FileReader();
    const img = new Image();
    const canvas = this.canvasRef.current;
    reader.onload = () => {
      const ctx = canvas.getContext("2d");
      img.onload = () => {
        ctx.drawImage(img, 0, 0, +this.props.width * 2, +this.props.height * 2);
        // 글씨 랜더
        this.renderText();
      };

      if (typeof reader.result === "string") {
        img.src = reader.result;
      } else {
        img.src = reader.result.toString();
      }
    };
    this.props.updateimgTarget(target);
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

  // 이미지 다운로드
  onDownLoad = ({ target }) => {
    const href = this.canvasRef.current.toDataURL();
    const link = document.createElement("a");
    link.download = "banner_img.png";
    link.href = href;
    link.click();
  };

  // 위치값 업데이트
  getPosition = e => {
    const rect = e.target.getBoundingClientRect();
    const x = (e.clientX - rect.left) * 2;
    const y = (e.clientY - rect.top) * 2;
    this.props.updatePostion(x, y);
  };

  // 리셋
  resetStyle = (e) => {
    switch (e.target.className) {
      case "bg":{
        this.props.updateWidth(init.width)
        this.props.updateHeight(init.height)
        this.props.updateBgColor(init.bgColor)
        this.props.updateimgTarget(init.imgTarget)
        break;
      } 
      case "font":{
        this.props.updateText(init.text)
        this.props.updateFontColor(init.fontColor)
        this.props.updateFontSize(+init.fontSize)
        this.props.updateFontFamily(init.fontFamily)
        break;
      } 
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="mainWrap">
          <Preview canvasRef={this.canvasRef} getPosition={this.getPosition} />
          <div className="row">
            <BgColorControler
              bgColor={this.props.bgColor}
              fontColor={this.props.fontColor}
              width={this.props.width}
              height={this.props.height}
              colorPicker={this.props.colorPicker}
              changeSize={this.changeSize}
              setBgImg={this.setBgImg}
              changeBgColor={this.changeBgColor}
              changeFontColor={this.changeFontColor}
              resetStyle={this.resetStyle}
            />
            <FontColorControler
              text={this.props.text}
              fontColor={this.props.fontColor}
              fontSize={this.props.fontSize}
              fontFamily={this.props.fontFamily}
              colorPicker={this.props.colorPicker}
              setText={this.setText}
              changeFontColor={this.changeFontColor}
              changeFontSize={this.changeFontSize}
              changeFontFamily={this.changeFontFamily}
              resetStyle={this.resetStyle}
            />
          </div>
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
