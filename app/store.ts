import {configureStore} from '@reduxjs/toolkit';
import ideaReducer from './slices/ideaSlice';


export const store = configureStore({
    reducer: {
        idea: ideaReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
