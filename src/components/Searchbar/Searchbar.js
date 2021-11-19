import PropTypes from 'prop-types';
import s from './Searchbar.module.css';
import SearchForm from './SearchForm';

export default function Searchbar({ onSubmit }) {
  return (
    <header className={s.searchbar}>
      <SearchForm onSubmit={onSubmit} />
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
