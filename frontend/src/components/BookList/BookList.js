import styles from './BookList.module.css';

const BookList = () => {
  return (
    <div className={`app-block ${styles['book-list']}`}>
      <h2>Book List</h2>
    </div>
  );
};

export default BookList;
