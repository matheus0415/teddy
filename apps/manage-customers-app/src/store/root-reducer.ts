import { combineReducers } from '@reduxjs/toolkit';
import { getClientReducer } from '../features';

export const rootReducer = combineReducers({
  clients: getClientReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
