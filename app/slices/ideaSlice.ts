import { createSlice } from "@reduxjs/toolkit";

interface IdeaState {
    isIdeaOpen: boolean
}

const initialState: IdeaState = {
    isIdeaOpen: false
}

const ideaSlice = createSlice({
    name: 'idea',
    initialState,
    reducers: {
        setIsIdeaOpen: (state, action) => {
            state.isIdeaOpen = action.payload
        }
    }
})

export const {setIsIdeaOpen} = ideaSlice.actions;

export default ideaSlice.reducer;