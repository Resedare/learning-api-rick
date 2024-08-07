import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from '../store/createSlice'

const store = configureStore({
        reducer: { characters: charactersReducer }
})

export default store