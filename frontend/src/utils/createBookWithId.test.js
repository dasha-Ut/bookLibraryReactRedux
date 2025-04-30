import { describe } from 'vitest';
import { vi } from 'vitest';
import createBookWithId from './createBookWithId';

// mocked all module(file/library)
// all calls will return 'mocked-uuid-123'
vi.mock('uuid', () => ({
  v4: () => 'mocked-uuid-123',
}));

describe('Create book with random Id', () => {
  it('should return a new book with object with id, source, isFavourite', () => {
    const inputBook = { title: 'Book', author: 'Daryna' };
    const source = 'manual';

    const newBook = createBookWithId(inputBook, source);

    expect(newBook).toEqual({
      title: 'Book',
      author: 'Daryna',
      source: 'manual',
      isFavorite: false,
      id: 'mocked-uuid-123',
    });
  });

  it('should not mutate the original book object', () => {
    const inputBook = { title: 'Immutable Book' };
    const copy = { ...inputBook };

    createBookWithId(inputBook, 'imported');

    expect(inputBook).toEqual(copy);
  });
});
