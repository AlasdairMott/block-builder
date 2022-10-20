import {configureStore} from '@reduxjs/toolkit';
import gridReducer from './grid';

export const store = configureStore({
    reducer: {
        grid: gridReducer
    }
});