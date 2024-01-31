import { Question } from "../types";
export const getRandom = (arr: Question[], c: number) => {
  let _arr = [...arr];
  return [...Array(c)].map(
    () => _arr.splice(Math.floor(Math.random() * _arr.length), 1)[0]
  );
};
