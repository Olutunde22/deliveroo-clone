import { configureStore, combineReducers } from '@reduxjs/toolkit'
import basketReducer from './features/basketSlice'
import restaurantReducer from './features/restaurantSlice'

const rootReducer = combineReducers({
    basket: basketReducer,
    restaurant: restaurantReducer
})

export const store = configureStore({
    reducer: rootReducer,
})