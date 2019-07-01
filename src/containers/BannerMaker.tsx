import React, { Component } from "react";
import { ChromePicker } from "react-color";
import { relative } from "path";

interface IProps {}
interface IState {
  [key: string]: any;
  bgColor: object;
  bgImg: string;
  fontColor: object;
  text: string;
  fontBgColor: object;
  positionX: number;
  positionY: number;
}
export class BannerMaker extends Component<{}, IState> {
  private canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

  state: IState = {
    width: 300,
    height: 300,
    bgColor: { r: 0, g: 0, b: 0, a: 1 },
    bgImg: "",
    fontColor: { r: 0, g: 0, b: 0, a: 1 },
    text: "",
    fontBgColor: { r: 0, g: 0, b: 0, a: 0 },
    positionX: 0,
    positionY: 0
  };

  componentDidMount() {
    const canvas = this.canvasRef.current;
    if (!!canvas) {
      const ctx = canvas.getContext("2d");
      if (!!ctx) {
        canvas.width = this.state.width;
        canvas.height = this.state.height;
      }
    }
  }

  /**
   * 글씨 설정
   * @param target : event target
   */
  setText = ({ target }) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.font = "10px Georgia";
    ctx.fillText(this.state.text, 0, 10);
    this.setState({
      text: target.value
    });
  };

  /**
   * 배너 배경색 변경
   * @param rgb : color rgbcode
   */
  changeBgColor = ({ rgb }) => {
    this.setState({
      bgColor: rgb
    });
  };

  /**
   * 글씨색 변경
   * @param rgb : color rgbcode
   */
  changeFontColor = ({ rgb }) => {
    this.setState({
      fontColor: rgb
    });
  };

  /**
   * 글씨 배경색 변경
   * @param rgb : color rgbcode
   */
  changeFontBgColor = ({ rgb }) => {
    this.setState({
      fontBgColor: rgb
    });
  };

  /**
   * 배너 배경이미지 설정
   * @param target : event target
   */
  randerBgImg = ({ target }) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext("2d");

      img.onload = () => {
        canvas.width = this.state.width;
        canvas.height = this.state.height;
        ctx.drawImage(img, 0, 0);
      };

      if (typeof reader.result === "string") {
        img.src = reader.result;
      } else {
        img.src = reader.result.toString();
      }
    };
    reader.readAsDataURL(target.files[0]);
  };

  /**
   * 배너 크기 설정
   * @param target : event target
   */
  changeSize = ({ target }) => {
    this.setState({
      [target.name]: Number(target.value)
    });
  };

  /**
   * 스티커 설정
   * @param target : event target
   */
  setSticker = ({ target }) => {
    // const img = new Image();
    // const canvas = this.canvasRef.current;
    // const ctx = canvas.getContext("2d");
    // img.onload = () => {
    //   canvas.width = this.state.width;
    //   canvas.height = this.state.height;
    //   ctx.drawImage(img, 0, 0);
    // };
    // img.src = target.result;
  };

  /**
   * 이미지 다운로드
   * @param target : event target
   */
  onDownLoad = ({ target }) => {
    this.setState({
      [target.name]: Number(target.value)
    });
  };

  //글씨 넣기

  getPosition = e => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    console.log(x, y);
    this.setState(
      {
        positionX: x,
        positionY: y
      },
      () => {
        // console.log(2, this.state.positionX, this.state.positionY);
        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect(this.state.positionX, this.state.positionY, 50, 50);
      }
    );
  };
  move = e => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    console.log(x, y);
  };

  render() {
    return (
      <React.Fragment>
        <div className="sizeControl">
          <p>사이즈 지정</p>
          <label>넓이</label>
          <input type="number" name="width" onChange={this.changeSize} />
          <label>높이</label>
          <input type="number" name="height" onChange={this.changeSize} />
        </div>
        <p>결과물</p>
        <div className="result" onMouseMove={this.move}>
          <canvas ref={this.canvasRef} width={100} height={100} onClick={this.getPosition} />
          <span className="tooltop">a</span>
        </div>
        <p>배경색 이미지 등록</p>
        <input type="file" onChange={this.randerBgImg} />
        <p>배경색 지정</p>
        <ChromePicker color={this.state.bgColor} onChangeComplete={this.changeBgColor} />
        <p>글씨 등록</p>
        <input type="text" onChange={this.setText} />
        <p>글씨색 지정</p>
        <ChromePicker color={this.state.fontColor} onChangeComplete={this.changeFontColor} />
        <p>배경색 지정</p>
        <ChromePicker color={this.state.fontBgColor} onChangeComplete={this.changeFontBgColor} />
      </React.Fragment>
    );
  }
}
