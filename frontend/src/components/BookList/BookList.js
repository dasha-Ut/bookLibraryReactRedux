import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs';
import styles from './BookList.module.css';
import { deleteBook, toggleFavorite } from '../../redux/books/actionCreators';

const BookList = () => {
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };

  console.log(styles);

  return (
    <div className={`app-block ${styles['book-list']}`}>
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>Np books available</p>
      ) : (
        <ul>
          {books.map((book, index) => (
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
