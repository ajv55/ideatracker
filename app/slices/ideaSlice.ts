import { createSlice } from "@reduxjs/toolkit";

interface Idea {
    id: number;
    title: string;
    tags: string;
    description: string;
    createdAt?: Date;
    category?: string;
    status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED';
}

interface IdeaState {
    isIdeaOpen: boolean,
    ideasList?: Idea[],
    isEditModalOpen?: boolean,
    isLoading?: boolean,
    ideaCredit?: string
}

const initialState: IdeaState = {
    isIdeaOpen: false,
    ideasList: [],
    isEditModalOpen: false,
    isLoading: false,
    ideaCredit: '',
}

export const ideaSlice = createSlice({
    name: 'idea',
    initialState,
    reducers: {
        setIsIdeaOpen: (state, action) => {
            state.isIdeaOpen = action.payload
        },
        setIdeasList: (state, action) => {
            state.ideasList = action.payload
        },
        setIsEditOpen: (state, action) => {
            state.isEditModalOpen = action.payload
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload

        },
        setIdeaCredit: (state, action) => {
            state.ideaCredit = action.payload
        }
    }
})

export const {setIsIdeaOpen, setIdeasList,setIsEditOpen, setIsLoading, setIdeaCredit} = ideaSlice.actions;

export default ideaSlice.reducer;