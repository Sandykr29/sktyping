import { configureStore } from '@reduxjs/toolkit';
import { typingReducer, typingActions } from './typingSlice';

export const store = configureStore({ reducer: { typing: typingReducer } });

// re-export actions for easy imports
export const {
	setMode, setText, setInput, setTime, decrementTime,
	startTyping, stopTyping, completeTyping, incrementBackspace,
	setStats, reset
} = typingActions;
