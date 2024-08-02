import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface LeadsState {
    message: string
}

const initialState: LeadsState = {
    message: '',
}

export const leadsSlice = createSlice({
    name: 'leads',
    initialState,
    reducers: {
        setMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setMessage } = leadsSlice.actions

export default leadsSlice.reducer