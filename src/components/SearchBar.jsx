import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { setRecipeList } from '../action';
import { searchByFirstLetter, searchByIngredient, searchByName } from '../services';
import '../styles/SearchBar.css';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [foodList, setFoodList] = useState([]);
  const [foodType, setFoodType] = useState('');
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    const type = pathname === '/bebidas' ? 'drinks' : 'meals';
    setFoodType(type);
  }, []);

  const searchRecipes = async () => {
    let api;
    if (radioValue === 'Ingrediente') {
      api = await searchByIngredient(searchQuery, pathname);
    } else if (radioValue === 'Nome') {
      api = await searchByName(searchQuery, pathname);
    } else {
      api = await searchByFirstLetter(searchQuery, pathname);
    }
    if (api) {
      setFoodList(api[foodType]);
      dispatch(setRecipeList(api[foodType]));
    }
  };

  console.log(foodList);

  return (
    <div className="searchBar-container">
      <input
        type="text"
        data-testid="search-input"
        placeholder="Buscar Receita"
        value={ searchQuery }
        onChange={ ({ target }) => setSearchQuery(target.value) }
      />
      <div className="searchBar-radios">
        <label htmlFor="ingredient">
          <input
            type="radio"
            id="ingredient"
            name="search-option"
            data-testid="ingredient-search-radio"
            value="Ingrediente"
            onChange={ ({ target }) => {
              setRadioValue(target.value);
            },
              ({target}) => {
                target.setAttribute('checked', true);
              }
            }
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            id="name"
            name="search-option"
            data-testid="name-search-radio"
            value="Nome"
            onChange={ 
              ({ target }) => setRadioValue(target.value),
              ({target}) => {
                target.setAttribute('checked', true);
              }
            }
          />
          Nome
        </label>
        <label htmlFor="firstLetter">
          <input
            type="radio"
            id="firstLetter"
            name="search-option"
            data-testid="first-letter-search-radio"
            value="Primeira_Letra"
            onChange={ 
              ({ target }) => setRadioValue(target.value),
              ({target}) => {
                target.setAttribute('checked', true);
              }
            }
          />
          Primeira Letra
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        className="searchBar-btn"
        onClick={ searchRecipes }
      >
        Buscar
      </button>
    </div>
  );
}
