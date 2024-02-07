import { selector } from "recoil";
import { PersonState } from "../atoms/Person.jsx";

export const EmailState = selector({
  key: "EmailState",
  get: ({ get }) => {
    const state = get(PersonState);
    return state.PersonEmail;
  },
});
