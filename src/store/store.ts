import {configureStore} from '@reduxjs/toolkit';
import gridReducer from './grid';
import uiReducer from './ui';

export const store = configureStore({
    reducer: {
        grid: gridReducer,
        ui: uiReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch