import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const userSlice = (state: RootState) => state.user;

export const selectUser = createSelector(
  [userSlice],
  (userSlice) => userSlice.user
);

export const selectUSerSkills = createSelector(
  [userSlice],
  (userSlice) => userSlice.user.skills
);
