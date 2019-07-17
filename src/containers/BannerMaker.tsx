import React, { Component } from "react";
import { ChromePicker } from "react-color";

interface IState {
  [key: string]: any;
  imgTarget: object;
  bgColor: { r: number; g: number; b: number; a: number };
  bgImg: string;
  fontColor: { r: number; g: number; b: number; a: number };
  text: string;
  fontBgColor: { r: number; g: number; b: number; a: number };
  positionX: number;
  positionY: number;
  href: string;
}

interface IEventTarget {
  target: HTMLInputElement & EventTarget;
}
export class BannerMaker extends Component<{}, IState> {
  private canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

  constructor(props) {
    super(props);
    this.state.positionX = this.state.width / 2;
    this.state.positionY = this.state.height / 2;
  }

  state: IState = {
    width: 560,
    height: 315,
    imgTarget: {},
    bgColor: { r: 204, g: 0, b: 0, a: 1 },
    bgImg: "",
    fontColor: { r: 255, g: 255, b: 255, a: 1 },
    text: "Sample Text",
    fontBgColor: { r: 0, g: 0, b: 0, a: 0 },
    positionX: 0,
    positionY: 0,
    href: ""
  };

  componentDidMount() {
    this.renderCanvas();
    this.renderText();
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextState.imgTarget === this.state.imgTarget) {
  //     return false;
  //   } else {
  //     this.renderCanvas();
  //     return true;
  //   }
  // }
  componentDidUpdate() {
    this.renderCanvas();
  }

  renderCanvas = () => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = this.state.width;
    canvas.height = this.state.height;

    if (Object.keys(this.state.imgTarget).length === 0) {
      const { r, g, b, a } = this.state.bgColor;
      ctx.fillStyle = `rgba(${[r, g, b, a]})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      this.randerBgImg(this.state.imgTarget);
    }
    this.renderText();
  };

  /**
   * 글씨 설정
   * @param target : event target
   */
  setText = ({ target }) => {
    this.setState(
      {
        text: target.value
      },
      this.renderText
    );
  };

  /**
   * 글씨 설정
   * @param target : event target
   */
  renderText = () => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { r, g, b, a } = this.state.fontColor;
    ctx.font = "30px Georgia";
    ctx.fillStyle = `rgba(${[r, g, b, a]})`;
    ctx.textAlign = "left"; // 가로 가운데 정렬
    ctx.textBaseline = "top";
    ctx.fillText(this.state.text, this.state.positionX, this.state.positionY);
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
  setBgImg = (event?: IEventTarget) => {
    this.setState({
      imgTarget: event.target
    });
    this.randerBgImg(event.target);
  };

  /**
   * 배너 배경이미지 설정
   * @param target : event target
   */
  randerBgImg = target => {
    const reader = new FileReader();
    const img = new Image();
    const canvas = this.canvasRef.current;
    if (!reader) return false;
    reader.onload = () => {
      const ctx = canvas.getContext("2d");
      img.onload = () => {
        canvas.width = this.state.width;
        canvas.height = this.state.height;
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

  /**
   * 배너 크기 설정
   * @param target : event target
   */
  changeSize = ({ target }) => {
    this.setState({
      [target.name]: +target.value
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
    const href = this.canvasRef.current.toDataURL();
    target.href = href;
    target.download = "banner_img.png";
  };

  //글씨 넣기

  getPosition = e => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // console.log(x, y);
    this.setState({
      positionX: x,
      positionY: y
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="header">
          <h1>Maker</h1>
        </div>
        <div className="mainWrap">
          <div className="perview">
            <canvas ref={this.canvasRef} width={100} height={100} onClick={this.getPosition} />
          </div>
          <div className="sizeControl">
            <div className="inputWrap">
              <label>width</label>
              <input type="number" name="width" onChange={this.changeSize} />
            </div>
            <div className="inputWrap">
              <label>height</label>
              <input type="number" name="height" onChange={this.changeSize} />
            </div>
          </div>
          <div className="bgImg">
            <div className="inputWrap">
              <label>배경 이미지 등록</label>
              <input type="file" onChange={this.setBgImg} />
            </div>
          </div>
          <div className="bgColor">
            <h2>배경색 지정</h2>
            <ChromePicker color={this.state.bgColor} onChangeComplete={this.changeBgColor} />
          </div>
          <div className="textContents">
            <h2>글씨 등록</h2>
            <textarea onChange={this.setText} />
          </div>
          <div className="textColor">
            <h2>글씨색 지정</h2>
            <ChromePicker color={this.state.fontColor} onChangeComplete={this.changeFontColor} />
          </div>
          <div className="textBgColor">
            <h2>배경색 지정</h2>
            <ChromePicker color={this.state.fontBgColor} onChangeComplete={this.changeFontBgColor} />
          </div>
          <div className="downLoadBtn">
            <a onClick={this.onDownLoad}>다운로드</a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
