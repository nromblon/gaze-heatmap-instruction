'use client'
import { useRef, useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { makeStore, AppStore, AppPersistor } from '../lib/store'

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<{ store: AppStore; persistor: AppPersistor } | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!storeRef.current) {
    // Create the store and persistor instance the first time this renders
    storeRef.current = makeStore()
  }

  // Don't render children until after hydration to prevent mismatch
  if (!isHydrated) {
    return null
  }

  return (
    <Provider store={storeRef.current.store}>
      <PersistGate loading={null} persistor={storeRef.current.persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}