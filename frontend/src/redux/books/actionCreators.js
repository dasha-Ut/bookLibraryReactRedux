import * as a from './actionTypes';

export const addBook = (newBook) => {
  return {
    type: a.ADD_BOOK,
    payload: newBook,
  };
};

export const deleteBook = () => {
  return {
    type: a.DELETE_BOOK,
  };
};

export const toggleBook = (newBook) => {
  return {
    type: a.TOGGLE_BOOK,
    payload: newBook,
  };
};
