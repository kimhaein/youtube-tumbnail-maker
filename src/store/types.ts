export type FinishStatus = "success" | "error";

export interface IStoreState {
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
