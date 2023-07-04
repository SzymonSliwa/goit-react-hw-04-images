import propTypes from 'prop-types';
import React, { Component } from 'react';

import 'styles.css';

import { nanoid } from 'nanoid';

export class Searchbar extends Component {
  state = { search: '' };

  handleSearchChange = e => {
    this.setState({
      search: e.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.search);
  };

  render() {
    const { search } = this.state;
    return (
      <header className="Searchbar">
        <form className="Form" onSubmit={this.handleSubmit}>
          <button
            type="submit"
            className="Button"
            onClick={this.props.onSearch}
          >
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
            onChange={this.handleSearchChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
