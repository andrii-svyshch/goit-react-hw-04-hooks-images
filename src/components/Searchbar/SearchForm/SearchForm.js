import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './SearchForm.module.css';
import { toast } from 'react-toastify';

export default function SearchForm({ onSubmit }) {
  const [query, setQuery] = useState('');
  const handleNameChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      return toast.error('What are you looking for?');
    }
    onSubmit(query);
    setQuery('');
  };
  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <button type="submit" className={s.button}>
        <span className={s.buttonLabel}>Search</span>
      </button>

      <input
        className={s.input}
        type="text"
        autoComplete="off"
        autoFocus
        value={query}
        placeholder="Search images and photos"
        onChange={handleNameChange}
      />
    </form>
  );
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
