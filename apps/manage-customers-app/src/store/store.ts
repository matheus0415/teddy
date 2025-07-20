import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';

// Estado inicial global (pode ser expandido conforme necessário)
export const initialGlobalState = {
  // O estado inicial dos modules é definido em cada reducer individual
  // Este objeto pode conter configurações globais se necessário
};

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Desabilitar thunk pois estamos usando saga
      serializableCheck: {
        // Ignore these action types from saga
        ignoredActions: [
          // Actions que o Redux-Saga usa internamente
          'saga/SAGA_LOCATION',
          // Adicione outras ações se necessário
        ],
      },
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
  // preloadedState pode ser usado para carregar estado inicial se necessário
  // preloadedState: initialGlobalState,
});

// Run the root saga
sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export default store
export default store;
