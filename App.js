import 'react-native-gesture-handler'
import React from 'react'
import Navigation from './navigation'
import { store } from './redux/store'
import { Provider } from 'react-redux'

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}