import { combineReducers } from '@reduxjs/toolkit';
import { getClientReducer } from '../features';

// Root reducer da aplicação
export const rootReducer = combineReducers({
  clients: getClientReducer,
  // Aqui podem ser adicionados outros reducers de features
  // Exemplo: auth: authReducer, user: userReducer, etc.
});

export type RootState = ReturnType<typeof rootReducer>;
