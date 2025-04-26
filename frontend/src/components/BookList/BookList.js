import { useSelector } from 'react-redux';
import styles from './BookList.module.css';

const BookList = () => {
  const books = useSelector((state) => state.books);
  return (
    <div className={`app-block ${styles['book-list']}`}>
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>Np books available</p>
      ) : (
        <ul>
          {books.map((book, index) => (
            <li key={index}>
              <div className={`${styles['book-info']}`}>
                {++index}.{book.title} by <strong>{book.author}</strong>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
