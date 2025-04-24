import { useState } from 'react';
import styles from './BookForm.module.css';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title && author) {
      // dispath
      setTitle('');
      setAuthor('');
    }
  };

  return (
    <div className={`app-block ${styles['book-form']}`}>
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>

        <div>
          <label htmlFor="title">Author: </label>
          <input
            type="text"
            id="title"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          ></input>
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default BookForm;
