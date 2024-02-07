import { selector } from "recoil";
import { PersonState } from "../atoms/Person.jsx";

export const RollState = selector({
  key: "RollState",
  get: ({ get }) => {
    const state = get(PersonState);
    return state.Roll;
  },
});
