import { atom } from "recoil";

export const PersonState = atom({
  key: "PersonState",
  default: {
    PersonEmail: null,
    Roll: null,
  },
});
