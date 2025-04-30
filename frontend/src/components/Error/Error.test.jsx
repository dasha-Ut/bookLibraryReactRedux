import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Error from './Error';
import { toast } from 'react-toastify';
import { clearError } from '../../redux/slices/errorSlice';
import * as React from 'react';
import { vi } from 'vitest';

// replace real library react-toastify.
// display just <div>ToastContainer</div> instead of real toast
vi.mock('react-toastify', () => ({
  ToastContainer: () => <div>ToastContainer</div>,
  toast: {
    info: vi.fn(), // create fake fn
  },
}));

// reassign selector to just get state.error.message
vi.mock('../../redux/slices/errorSlice', () => ({
  selectErrorMessage: (state) => state.error.message,
  clearError: { type: 'CLEAR_ERROR' }, // create fake fn
}));

// create mock store
const mockStore = configureStore([]);

// combine tests by topic
describe('Error component', () => {
  let store;

  // before each test create fake store with value 'Test error message'.
  beforeEach(() => {
    store = mockStore({
      error: {
        message: 'Test error message',
      },
    });
    store.dispatch = vi.fn(); // fake fn
    vi.clearAllMocks(); // clear all mocks- so prev test do not affect others
  });

  it('should render ToastContainer', () => {
    render(
      // draw component in test env
      <Provider store={store}>
        <Error />
      </Provider>
    );

    // search element in dom
    expect(screen.getByText('ToastContainer')).toBeInTheDocument();
  });

  it('should show toast and dispatch clearError when errorMessage exists', () => {
    render(
      <Provider store={store}>
        <Error />
      </Provider>
    );

    expect(toast.info).toHaveBeenCalledWith('Test error message');
    expect(store.dispatch).toHaveBeenCalledWith(clearError);
  });

  it('should not call toast or dispatch if there is no errorMessage', () => {
    store = mockStore({
      error: {
        message: null,
      },
    });
    store.dispatch = vi.fn();

    render(
      <Provider store={store}>
        <Error />
      </Provider>
    );

    expect(toast.info).not.toHaveBeenCalled();
    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
