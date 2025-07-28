import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'
import manualSlice from './features/manual/manualSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['manuals'] // only persist manuals slice
}

const rootReducer = combineReducers({
  manuals: manualSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }),
  })
  
  const persistor = persistStore(store)
  return { store, persistor }
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>['store']
export type AppPersistor = ReturnType<typeof makeStore>['persistor']
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']