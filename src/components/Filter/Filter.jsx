import PropTypes from 'prop-types';
import css from './Filter.module.css';

function Filter({ filter, changeFilter }) {
  return (
    <label className={css.label}>
      <input className={css.input} type="text" value={filter} onChange={changeFilter} />
    </label>
  );
}

Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    changeFilter: PropTypes.func.isRequired,
}

export default Filter;
