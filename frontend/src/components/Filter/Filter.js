import { useDispatch, useSelector } from 'react-redux';
import {
  setTitleFilter,
  selectTitleFilter,
  resetFilters,
} from '../../redux/slices/filterSlice';
import styles from './Filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div className={`${styles.filter} app-block`}>
      <div className={`${styles['filter-row']}`}>
        <div className={`${styles['filter-group']}`}>
          <input
            type="text"
            placeholder="Filer by title..."
            value={titleFilter}
            onChange={(event) => dispatch(setTitleFilter(event.target.value))}
          />
        </div>
        <button type="button" onClick={handleResetFilters}>
          Reset filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
