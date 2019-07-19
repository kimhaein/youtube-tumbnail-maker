import { ActionType, getType } from "typesafe-actions";
import { IStoreState } from "../store";
import * as Actions from "../actions";

// store 초기 값 세팅
export const initializeState: IStoreState = {
  width: "700",
  height: "350",
  imgTarget: {},
  bgColor: { r: 204, g: 0, b: 0, a: 1 },
  fontColor: { r: 255, g: 255, b: 255, a: 1 },
  text: "Sample Text",
  fontBgColor: { r: 0, g: 0, b: 0, a: 0 },
  positionX: 350,
  positionY: 175,
  href: ""
};

export default (state: IStoreState = initializeState, action: ActionType<typeof Actions>) => {
  switch (action.type) {
    case getType(Actions.updateWidth):
      return {
        ...state,
        width: action.payload.width
      };
    case getType(Actions.updateHeight):
      return {
        ...state,
        height: action.payload.height
      };
    case getType(Actions.updateBgColor):
      return {
        ...state,
        bgColor: action.payload.bgColor
      };
    case getType(Actions.updatePostion):
      return {
        ...state,
        positionX: action.payload.positionX,
        positionY: action.payload.positionY
      };
    case getType(Actions.updateText):
      return {
        ...state,
        text: action.payload.text
      };
    case getType(Actions.updateFontColor):
      return {
        ...state,
        fontColor: action.payload.fontColor
      };
    default:
      return Object.assign({}, state);
  }
};
