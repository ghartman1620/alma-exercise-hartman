import { createSelector } from "@reduxjs/toolkit";
import { createAppSelector } from "../hooks";
import { RootState } from "../store";

export const selectLeadsMessage = createAppSelector(
    [(state) => state.leads],
    leads => leads.message
)
