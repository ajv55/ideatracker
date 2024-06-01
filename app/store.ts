import {configureStore} from '@reduxjs/toolkit';
import ideaReducer from './slices/ideaSlice';
import milestoneReducer from './slices/milestoneSlice';


export const store = configureStore({
    reducer: {
        idea: ideaReducer,
        milestone: milestoneReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
