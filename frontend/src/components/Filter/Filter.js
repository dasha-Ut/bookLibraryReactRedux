import { useDispatch, useSelector } from 'react-redux';
import {
  setTitleFilter,
  selectTitleFilter,
  resetFilters,
  selectAuthorFilter,
  setAuthorFilter,
  setOnlyFavoriteFilter,
  selectOnlyFavourite,
} from '../../redux/slices/filterSlice';
import styles from './Filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavoriteFilter = useSelector(selectOnlyFavourite);

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const handleOnlyFavoriteFilterChange = () => {
    dispatch(setOnlyFavoriteFilter());
  };

  return (
    <div className={`${styles.filter} app-block`}>
      <div className={`${styles['filter-row']}`}>
        <div className={`${styles['filter-group']}`}>
          <input
            type="text"
            placeholder="Filter by title..."
            value={titleFilter}
            onChange={(event) => dispatch(setTitleFilter(event.target.value))}
          />
        </div>
        <div className={`${styles['filter-group']}`}>
          <input
            type="text"
            placeholder="Filter by author..."
            value={authorFilter}
            onChange={(event) => dispatch(setAuthorFilter(event.target.value))}
          />
        </div>

        <div className={`${styles['filter-group']}`}>
          <label>
            <input
              type="checkbox"
              checked={onlyFavoriteFilter}
              onChange={handleOnlyFavoriteFilterChange}
            />
            Only Favorite
          </label>
        </div>

        <button type="button" onClick={handleResetFilters}>
          Reset filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
