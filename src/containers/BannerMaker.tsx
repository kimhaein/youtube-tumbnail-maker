import React, { Component } from "react";

interface IProps {}
export class BannerMaker extends Component<IProps, {}> {
  private canvas: React.RefObject<HTMLCanvasElement>;
  constructor(props: IProps) {
    super(props);
    this.canvas = React.createRef();
  }
  componentDidMount() {
    const canvas = this.canvas.current || null;
    if (!!canvas) {
      const ctx = canvas.getContext("2d");
      if (!!ctx) {
        ctx.fillStyle = "rgb(200, 0, 0)";
        ctx.fillRect(10, 10, 50, 50);

        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect(30, 30, 50, 50);

        ctx.font = "30px Georgia";
        ctx.fillText("Hello World!", 0, 50);
        ctx.font = "10px Georgia";
        ctx.fillText("1111!", 0, 10);
      }
    }
  }
  render() {
    return (
      <React.Fragment>
        <canvas ref={this.canvas} width={100} height={100}>
          current stock price: $3.15 + 0.15
        </canvas>
      </React.Fragment>
    );
  }
}
