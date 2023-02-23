import { atom } from "recoil";

export const totalOCAtom = atom<number>({
  key: "totalOCAtom",
  default: 0,
});
