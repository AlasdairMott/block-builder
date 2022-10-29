import { configureStore } from '@reduxjs/toolkit';
import undoable from 'redux-undo';
import gridReducer from './grid';
import modelReducer from './model';
import uiReducer from './ui';

export const store = configureStore({
    reducer: {
        grid: undoable(gridReducer),
        model: modelReducer,
        ui: uiReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch