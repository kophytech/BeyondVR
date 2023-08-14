import { configureStore, createSlice } from "@reduxjs/toolkit";

type QAData = {
  videoUrl: string;
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer: string;
};

const initialState: { QAData: QAData[]; Exercises: [] } = {
  QAData: [],
  Exercises: [],
};

const qaDataSlice = createSlice({
  name: "qaData",
  initialState,
  reducers: {
    updateQAData(state, action) {
      state.QAData = action.payload;
    },
    updateExerciseData(state, action) {
      state.Exercises = action.payload;
    },
  },
});

// Load state from session storage if available
const loadStateFromSessionStorage = () => {
  try {
    const serializedState = sessionStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

// Save state to session storage
const saveStateToSessionStorage = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("reduxState", serializedState);
  } catch (error) {
    // Handle any errors
  }
};

const store = configureStore({
  reducer: qaDataSlice.reducer, //since we currently have one slice
  preloadedState: loadStateFromSessionStorage(),
});

// Save state to session storage whenever it changes
store.subscribe(() => {
  const state = store.getState();
  saveStateToSessionStorage(state);
});

export const qaActions = qaDataSlice.actions;

export default store;
