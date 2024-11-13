// FILL HERE 3.3


import { configureStore } from '@reduxjs/toolkit';

import candidatesSlice from './candidatesSlice';
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    
    candidates: candidatesSlice,
    user: userSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
