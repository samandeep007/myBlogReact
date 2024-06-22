import { configureStore } from "@reduxjs/toolkit";
import reducers from './authSlice.js'

const store = configureStore({
    reducer: {
        reducers
    }
});

export default store;