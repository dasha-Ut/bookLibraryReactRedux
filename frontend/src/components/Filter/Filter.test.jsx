import { render, screen, fireEvent } from '@testing-library/react';
import Filter from './Filter';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import {
  setTitleFilter,
  setAuthorFilter,
  resetFilters,
  setOnlyFavoriteFilter,
} from '../../redux/slices/filterSlice';

// 🔧 Мокаємо slice
vi.mock('../../redux/slices/filterSlice', async () => {
  const actual = await vi.importActual('../../redux/slices/filterSlice');
  return {
    ...actual,
    setTitleFilter: (title) => ({ type: 'SET_TITLE_FILTER', payload: title }),
    setAuthorFilter: (author) => ({
      type: 'SET_AUTHOR_FILTER',
      payload: author,
    }),
    resetFilters: () => ({ type: 'RESET_FILTERS' }),
    setOnlyFavoriteFilter: () => ({ type: 'TOGGLE_ONLY_FAVORITE' }),
    selectTitleFilter: (state) => state.filters.title,
    selectAuthorFilter: (state) => state.filters.author,
    selectOnlyFavourite: (state) => state.filters.onlyFavorite,
  };
});

const mockStore = configureStore([]);

describe('Filter component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      filters: {
        title: 'Initial Title',
        author: 'Initial Author',
        onlyFavorite: false,
      },
    });
    store.dispatch = vi.fn(); // слідкуємо за викликами
  });

  const renderWithStore = () =>
    render(
      <Provider store={store}>
        <Filter />
      </Provider>
    );

  it('renders title input, author input, checkbox and reset button', () => {
    renderWithStore();

    // інпут заголовку
    expect(
      screen.getByPlaceholderText('Filter by title...')
    ).toBeInTheDocument();

    // інпут автора
    expect(
      screen.getByPlaceholderText('Filter by author...')
    ).toBeInTheDocument();

    // чекбокс "Only Favorite"
    expect(screen.getByLabelText(/only favorite/i)).toBeInTheDocument();

    // кнопка скидання фільтрів
    expect(
      screen.getByRole('button', { name: /reset filters/i })
    ).toBeInTheDocument();
  });

  it('renders filter inputs with initial values from store', () => {
    renderWithStore();

    expect(screen.getByPlaceholderText('Filter by title...')).toHaveValue(
      'Initial Title'
    );
    expect(screen.getByPlaceholderText('Filter by author...')).toHaveValue(
      'Initial Author'
    );
    expect(screen.getByLabelText(/only favorite/i)).not.toBeChecked();
  });

  it('dispatches setTitleFilter on title input change', () => {
    renderWithStore();

    const titleInput = screen.getByPlaceholderText('Filter by title...');
    fireEvent.change(titleInput, { target: { value: 'New Title' } });

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'SET_TITLE_FILTER',
      payload: 'New Title',
    });
  });

  it('dispatches setAuthorFilter on author input change', () => {
    renderWithStore();

    const authorInput = screen.getByPlaceholderText('Filter by author...');
    fireEvent.change(authorInput, { target: { value: 'New Author' } });

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'SET_AUTHOR_FILTER',
      payload: 'New Author',
    });
  });

  it('dispatches setOnlyFavoriteFilter on checkbox toggle', () => {
    renderWithStore();

    const checkbox = screen.getByLabelText(/only favorite/i);
    fireEvent.click(checkbox);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'TOGGLE_ONLY_FAVORITE',
    });
  });

  it('dispatches resetFilters on reset button click', () => {
    renderWithStore();

    const button = screen.getByRole('button', { name: /reset filters/i });
    fireEvent.click(button);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'RESET_FILTERS',
    });
  });
});
