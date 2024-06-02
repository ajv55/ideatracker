import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

interface MilestoneState {
    milestoneList?: [],
    milestoneIsLoading?: boolean,
    milestoneModal?: boolean,
    milestoneDeleteModal?: boolean,
    aiModal?: boolean,
    editmilestoneModal?: boolean,
    aiSuggestionModal?: boolean
}

const initialState: MilestoneState = {
    milestoneList: [],
    milestoneIsLoading: false,
    milestoneModal: false,
    milestoneDeleteModal: false,
    aiModal: false,
    editmilestoneModal: false,
    aiSuggestionModal: false
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
        setMilestoneDeleteModal: (state, action) => {
            state.milestoneDeleteModal = action.payload
        },
        setAiModal: (state, action) => {
            state.aiModal = action.payload
        },
        setEditModal: (state, action) => {
            state.editmilestoneModal = action.payload
        },
        setAiSuggestionModal: (state, action) => {
            state.aiSuggestionModal = action.payload
        }
    }
})

export const { setMilestoneIsLoading, setMilestoneList, setMilestoneModal, setMilestoneDeleteModal, setAiModal, setEditModal, setAiSuggestionModal } = milestoneSlice.actions;

export default milestoneSlice.reducer;