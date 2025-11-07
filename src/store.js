import { configureStore, createSlice } from '@reduxjs/toolkit';

const typingSlice = createSlice({
  name: 'typing',
  initialState: {
    mode: 'english',
    text: '',
    input: '',
    time: 5,
    timeLeft: 300,
    started: false,
    completed: false,
    stats: null,
    backspaceCount: 0,
  },
  reducers: {
    setMode: (state, action) => { state.mode = action.payload; },
    setText: (state, action) => { state.text = action.payload; },
    setInput: (state, action) => { state.input = action.payload; },
    setTime: (state, action) => { state.time = action.payload; state.timeLeft = action.payload * 60; },
    decrementTime: (state) => { if (state.timeLeft > 0) state.timeLeft -= 1; },
    startTyping: (state) => { state.started = true; },
    stopTyping: (state) => { state.started = false; },
    completeTyping: (state) => { state.completed = true; },
    incrementBackspace: (state) => { state.backspaceCount += 1; },
    setStats: (state, action) => { state.stats = action.payload; },
    reset: (state) => {
      state.input = '';
      state.started = false;
      state.completed = false;
      state.stats = null;
      state.backspaceCount = 0;
      state.timeLeft = state.time * 60;
    }
  }
});

export const { setMode, setText, setInput, setTime, decrementTime, startTyping, stopTyping, completeTyping, incrementBackspace, setStats, reset } = typingSlice.actions;

export const store = configureStore({ reducer: { typing: typingSlice.reducer } });

export * from './store/index.js';