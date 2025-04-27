import { useDispatch, useSelector } from 'react-redux';
import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs';
import {
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavourite,
} from '../../redux/slices/filterSlice';
import {
  deleteBook,
  toggleFavorite,
  selectBooks,
} from '../../redux/slices/booksSlice';
import styles from './BookList.module.css';

const BookList = () => {
  const books = useSelector(selectBooks);
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavoriteFilter = useSelector(selectOnlyFavourite);

  const dispatch = useDispatch();

  const filterBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());

    const matchesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());

    const matchesFavorite = onlyFavoriteFilter ? book.isFavorite : true;

    return matchesAuthor && matchesTitle && matchesFavorite;
  });

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };

  const highlightMatch = (text, filter) => {
    if (!filter) return text;

    const regex = new RegExp(`(${filter})`, 'gi');

    return text.split(regex).map((substring, index) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={index} className={styles.highlight}>
            {substring}
          </span>
        );
      }
      return substring;
    });
  };

  return (
    <div className={`app-block ${styles['book-list']}`}>
      <h2>Book List</h2>
      {filterBooks.length === 0 ? (
        <p>Np books available</p>
      ) : (
        <ul>
          {filterBooks.map((book, index) => (
            <li key={book.id}>
              <div className={`${styles['book-info']}`}>
                {++index}.{highlightMatch(book.title, titleFilter)} by{' '}
                <strong>{highlightMatch(book.author, authorFilter)}</strong> (
                {book.source})
              </div>
              <div className={`${styles['book-actions']}`}>
                {book.isFavorite ? (
                  <BsBookmarkStarFill
                    className={`${styles['star-icon']}`}
                    onClick={() => handleToggleFavorite(book.id)}
                  />
                ) : (
                  <BsBookmarkStar
                    className={`${styles['star-icon']}`}
                    onClick={() => handleToggleFavorite(book.id)}
                  />
                )}
                <button onClick={() => handleDeleteBook(book.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
