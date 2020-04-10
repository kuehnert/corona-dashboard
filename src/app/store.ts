import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import coronaReducer from "../features/dashboard/coronaSlice";

export const store = configureStore({
  reducer: {
    corona: coronaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
