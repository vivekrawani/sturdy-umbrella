'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { store, persistor } from '../lib/store'
// import { initializeCount } from '../lib/features/counter/counterSlice' 
import { PersistGate } from 'redux-persist/integration/react'
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {



  return (
    <PersistGate persistor={persistor} loading={null}>
      <Provider store={store}>{children}</Provider>
    </PersistGate>
  )
}