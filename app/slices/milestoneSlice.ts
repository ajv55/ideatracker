import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

interface MilestoneState {
    milestoneList?: [],
    milestoneIsLoading?: boolean,
    milestoneModal?: boolean
}

const initialState: MilestoneState = {
    milestoneList: [],
    milestoneIsLoading: false,
    milestoneModal: false
} as MilestoneState

export const milestoneSlice = createSlice({
    name: 'milestone',
    initialState,
    reducers: {
        setMilestoneList: (state, action) => {
            state.milestoneList = action.payload
        },
        setMilestoneIsLoading: (state, action) => {
            state.milestoneIsLoading = action.payload
        },
        setMilestoneModal: (state, action) => {
            state.milestoneModal = action.payload
        },
    }
})

export const { setMilestoneIsLoading, setMilestoneList, setMilestoneModal } = milestoneSlice.actions;

export default milestoneSlice.reducer;