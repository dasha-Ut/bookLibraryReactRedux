import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styles from './BookList.module.css';
import { deleteBook } from '../../redux/books/actionCreators';

const BookList = () => {
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };

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
