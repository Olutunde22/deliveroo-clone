import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            state.items = [...state.items, action.payload]
        },
        removeFromBasket: (state, action) => {
            const index = state.items.findIndex((item) => item.id === action.payload.id)
            let newBasket = [...state.items]

            if (index >= 0) {
                newBasket.splice(index, 1)
            } else {
                console.warn('Cannot remove item')
            }
            state.items = newBasket
        },
        clearBasket: (state) => {
            state.items = []
        }
    },
})

export const { addToBasket, clearBasket, removeFromBasket } = basketSlice.actions

export const selectBasketItems = state => state.basket.items

export const selectBasketItemsById = (state, id) => state.basket?.items.filter(item => item.id === id)

export const selectBasketTotal = state =>
    state.basket.items.reduce((total, item) => total += item.price, 0)

export const selectGroupedItems = state => state.basket.items.reduce((results, item) => {
    (results[item.id] = results[item.id] || []).push(item)
    return results
}, {})

export default basketSlice.reducer