import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export function Searchbar({ onSubmit }) {
  const [name, setName] = useState('');

  const handleChange = evt => {
    setName(evt.currentTarget.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (name.trim() === '') {
      alert('Please input name for search');
      return;
    }
    onSubmit(name);
    setName('');
  };

  return (
    <div>
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
            value={name}
          />
        </form>
      </header>
    </div>
  );
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
