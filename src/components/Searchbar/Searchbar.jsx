import propTypes from 'prop-types';
import React, { useState } from 'react';

import 'styles.css';

import { nanoid } from 'nanoid';

export const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleSearchChange = e => {
    setSearch(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(search);
  };

  return (
    <header className="Searchbar">
      <form className="Form" onSubmit={handleSubmit}>
        <button type="submit" className="Button">
          <span className="Button-label">Search</span>
        </button>

        <input
          className="Input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="name"
          key={nanoid}
          value={search}
          onChange={handleSearchChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
