import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Lead {
    firstName: string,
    lastName: string,
    email: string,
    linkedInLink: string,
    visaTypes: string[],
    helpInformation: string,
    status: string,
}
export interface LeadsState {
    leads: Lead[]
}

const initialState: LeadsState = {
    leads: []
}

export const leadsSlice = createSlice({
    name: 'leads',
    initialState,
    reducers: {
        setLeads: (state, action: PayloadAction<Lead[]>) => {
            state.leads = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setLeads } = leadsSlice.actions

export default leadsSlice.reducer