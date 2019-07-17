import { ActionType, getType } from "typesafe-actions";
import { IStoreState } from "../store";
import * as Actions from "../actions";

// store 초기 값 세팅
export const initializeState: IStoreState = {
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

export default (state: IStoreState = initializeState, action: ActionType<typeof Actions>) => {
  switch (action.type) {
    case getType(Actions.setWidth):
      return {
        ...state,
        width: action.payload.width
      };
    case getType(Actions.setHeight):
      return {
        ...state,
        height: state.height
      };
    default:
      return Object.assign({}, state);
  }
};
