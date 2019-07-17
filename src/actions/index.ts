import { createAction } from "typesafe-actions";

// TODO: 참고
export const createAsyncTask = createAction("@command/async-task/create", resolve => (id: string, action: string) => {
  return resolve({ id, action });
});

// 넓이값 지정
export const setWidth = createAction("@set/width", resolve => (width: number) => {
  return resolve({ width });
});

// 높이값 지정
export const setHeight = createAction("@set/height", resolve => (height: number) => {
  return resolve({ height });
});
