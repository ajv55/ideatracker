import { createSlice } from "@reduxjs/toolkit";

interface MilestoneState {
    milestoneList?: [],
    milestoneIsLoading?: boolean,
    milestoneModal?: boolean,
    milestoneDeleteModal?: boolean,
    aiModal?: boolean,
    editmilestoneModal?: boolean,
    aiSuggestionModal?: boolean,
    suggestionLog?: [],
    suggestionIsLoading?: boolean,
    currentCredits?: number
}

const initialState: MilestoneState = {
    milestoneList: [],
    milestoneIsLoading: false,
    milestoneModal: false,
    milestoneDeleteModal: false,
    aiModal: false,
    editmilestoneModal: false,
    aiSuggestionModal: false,
    suggestionLog: [],
    suggestionIsLoading: false,
    currentCredits: 0
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
        },
        setSuggestionLog: (state, action) => {
            state.suggestionLog = action.payload
        },
        setSuggestionIsLoading: (state, action) => {
            state.suggestionIsLoading = action.payload
        },
        setCurrentCredits: (state, action) => {
            state.currentCredits = action.payload
        }
    }
})

export const { setMilestoneIsLoading, setMilestoneList, setMilestoneModal, setMilestoneDeleteModal, setAiModal, setEditModal, setAiSuggestionModal, setSuggestionLog, setSuggestionIsLoading, setCurrentCredits } = milestoneSlice.actions;

export default milestoneSlice.reducer;