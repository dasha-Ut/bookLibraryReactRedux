import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import booksReducer from './books/reducer';

const store = configureStore({
  reducer: {
    books: booksReducer,
    filter: filterReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', // Включити DevTools тільки в режимі розробки
});

export default store;
