import { useDispatch, useSelector } from 'react-redux';
import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs';
import {
  selectTitleFilter,
  selectAuthorFilter,
} from '../../redux/slices/filterSlice';
import styles from './BookList.module.css';
import { deleteBook, toggleFavorite } from '../../redux/books/actionCreators';

const BookList = () => {
  const books = useSelector((state) => state.books);
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);

  const dispatch = useDispatch();

  const filterBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());

    const matchesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());

    return matchesAuthor && matchesTitle;
  });

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
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
                {++index}.{book.title} by <strong>{book.author}</strong>
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
