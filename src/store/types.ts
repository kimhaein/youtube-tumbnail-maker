export interface IEventTarget {
  target: HTMLInputElement & EventTarget;
}
export interface IStoreState {
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
}
