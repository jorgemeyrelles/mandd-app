import React from 'react';
import { useHistory } from 'react-router-dom';
import DrinkDetailCard from '../../components/DrinkDetailCard';

export default function DrinkRecipes() {
  const history = useHistory();

  return (
    <div>
      <div
        className="container-header-filters"
        style={ { background: '0', display: 'flex', padding: 0 } }
      >
        <div
          className="container-header"
          style={ { borderRadius: '0 0 15px 15px', justifyContent: 'space-between' } }
        >
          <h3 style={ { marginBottom: '0', color: '#e9e8e8', fontWeight: 'bold' } }>
            Drink details
          </h3>
          <button
            type="button"
            style={ { background: 'none', opacity: 'none', border: 'none' } }
            onClick={ () => history.push('/mandd-app/bebidas') }
          >
            <img src="https://icongr.am/entypo/home.svg?size=40&&color=e9e8e8" alt="icon home" />
          </button>
        </div>
      </div>
      <div style={ { marginTop: '10px' } }>
        <DrinkDetailCard />
      </div>
    </div>
  );
}
