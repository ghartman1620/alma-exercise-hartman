import { createSelector } from '@reduxjs/toolkit';
import { createAppSelector } from '../hooks';
import { RootState } from '../store';

export const selectLeads = createAppSelector(
    [(state) => state.leads],
    leadsSlice => leadsSlice.leads
);
