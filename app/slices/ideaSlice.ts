import { createSlice } from "@reduxjs/toolkit";

interface Idea {
    id: number;
    title: string;
    description: string;
    createdAt?: Date;
    category?: string;
    status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED';
}

interface IdeaState {
    isIdeaOpen: boolean,
    ideasList?: Idea[],
}

const initialState: IdeaState = {
    isIdeaOpen: false,
    ideasList: []
}

const ideaSlice = createSlice({
    name: 'idea',
    initialState,
    reducers: {
        setIsIdeaOpen: (state, action) => {
            state.isIdeaOpen = action.payload
        },
        setIdeasList: (state, action) => {
            state.ideasList = action.payload
        }
    }
})

export const {setIsIdeaOpen, setIdeasList} = ideaSlice.actions;

export default ideaSlice.reducer;