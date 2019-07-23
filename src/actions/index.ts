import { createAction } from "typesafe-actions";

// 넓이값 업데이트
export const updateWidth = createAction("@style/width/update", resolve => (width: string) => {
  return resolve({ width });
});

// 높이값 업데이트
export const updateHeight = createAction("@style/height/update", resolve => (height: string) => {
  return resolve({ height });
});

// bgColor값 업데이트
export const updateBgColor = createAction("@style/bgColor/update", resolve => (bgColor: object) => {
  return resolve({ bgColor });
});
// imgTarget값 업데이트
export const updateimgTarget = createAction("@style/imgTarget/update", resolve => (imgTarget: object) => {
  return resolve({ imgTarget });
});

// text위치값 업데이트
export const updatePostion = createAction("@style/postion/update", resolve => (positionX: number, positionY: number) => {
  return resolve({ positionX, positionY });
});
// text값 업데이트
export const updateText = createAction("@style/text/update", resolve => (text: string) => {
  return resolve({ text });
});
// text색상값 업데이트
export const updateFontColor = createAction("@style/fontColor/update", resolve => (fontColor: object) => {
  return resolve({ fontColor });
});
// text크기값 업데이트
export const updateFontSize = createAction("@style/fontSize/update", resolve => (fontSize: string) => {
  return resolve({ fontSize });
});

// text폰트 업데이트
export const updateFontFamily = createAction("@style/fontFamily/update", resolve => (fontFamily: string) => {
  return resolve({ fontFamily });
});
