import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import FiltersBar from './FiltersBar';

export default function Header(props) {
  const [isVisibleSearchBar, setVisibleSearchBar] = useState(false);
  const history = useHistory();
  const { title, search, fetchType, filterBar } = props;

  const buttonSearch = () => (
    <div
      role="button"
      onKeyPress={ () => setVisibleSearchBar(!isVisibleSearchBar) }
      onClick={ () => setVisibleSearchBar(!isVisibleSearchBar) }
      tabIndex="0"
    >
      <img
        data-testid="search-top-btn"
        alt="search button"
        src={ searchIcon }
      />
    </div>
  );

  return (
    <section
      className="container-header-filters"
      style={ { borderRadius: '0 0 15px 15px', zIndex: '2' } }
    >
      <header
        className="container-header"
        style={ { background: '0', display: 'flex', paddingBottom: 0 } }
      >
        <div
          style={ { width: '30px' } }
          role="button"
          onKeyPress={ () => history.push('/mandd-app/perfil') }
          onClick={ () => history.push('/mandd-app/perfil') }
          tabIndex="0"
        >
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile icon"
          />
        </div>
        <h3
          data-testid="page-title"
          style={ { margin: 'auto', fontWeight: 'bold' } }
        >
          { title }
        </h3>
        <div style={ { width: '30px' } }>
          { search && buttonSearch() }
        </div>
      </header>
      <section>
        { isVisibleSearchBar && <SearchBar fetchType={ fetchType } /> }
        { filterBar && !isVisibleSearchBar && <FiltersBar fetchType={ fetchType } /> }
      </section>
    </section>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  search: PropTypes.bool,
}.isRequired;
