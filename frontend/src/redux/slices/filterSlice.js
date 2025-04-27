import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  author: '',
  onlyFavorite: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      return { ...state, title: action.payload };
      // Can mutate state thanks to Immer library
      // or state.title = action.payload
    },
    setAuthorFilter: (state, action) => {
      return { ...state, author: action.payload };
      // Can mutate state thanks to Immer library
      // or state.title = action.payload
    },
    setOnlyFavoriteFilter: (state, action) => {
      return { ...state, onlyFavorite: !state.onlyFavorite };
      // state.onlyFavorite = !state.onlyFavorite
    },
    resetFilters: ( ) => {
      return { ...initialState };
    },
  },
});

export const {
  setTitleFilter,
  resetFilters,
  setAuthorFilter,
  setOnlyFavoriteFilter,
} = filterSlice.actions;

export const selectTitleFilter = (state) => state.filter.title;

export const selectAuthorFilter = (state) => state.filter.author;

export const selectOnlyFavourite = (state) => state.filter.onlyFavorite;

export default filterSlice.reducer;
