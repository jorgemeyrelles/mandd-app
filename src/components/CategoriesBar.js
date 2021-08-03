import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { fetchMealsByCategories, fetchMealsCategory } from '../services/meailAPI';
import { fetchCocktailsByCategories, fetchDrinkCategory } from '../services/cocktailAPI';
import RecipesContext from '../context/RecipesContext';

function CategoriesBar({ recipeType }) {
  const [mealsCategory, setMealsCategory] = useState([]);
  const [drinkCategory, setDrinksCategory] = useState([]);
  const [btnName, setBtnName] = useState('');
  const { setDrinksData, setMealsData,
    resetFilter, toggle, setToggle } = useContext(RecipesContext);

  useEffect(() => {
    async function fetchCategory() {
      if (recipeType === 'meals') {
        const responseMeals = await fetchMealsCategory();
        setMealsCategory(responseMeals);
      } else {
        const responseDrinks = await fetchDrinkCategory();
        setDrinksCategory(responseDrinks);
      }
    }
    fetchCategory();
  }, [recipeType]);

  async function handleClick({ target }) {
    const { value, name } = target;
    if (recipeType === 'meals') {
      const responseMeals = await fetchMealsByCategories(value);
      setMealsData(responseMeals);
    }
    if (recipeType === 'bebidas') {
      const responseDrinks = await fetchCocktailsByCategories(value);
      setDrinksData(responseDrinks);
    }
    if (!toggle) {
      setToggle(true);
      setBtnName(name);
    } if (toggle && name === btnName) {
      resetFilter();
      setToggle(false);
    }
  }

  function renderCategoryBar(strCategory, index) {
    return (
      <button
        key={ index }
        data-testid={ `${strCategory}-category-filter` }
        type="button"
        id={ `${strCategory}-category-filter` }
        value={ strCategory }
        onClick={ (e) => handleClick(e) }
      >
        { strCategory }
      </button>
    );
  }

  function renderCategoryMeals() {
    return (
      mealsCategory.map(({ strCategory }, index) => renderCategoryBar(strCategory, index))
    );
  }

  function renderCategoryDrink() {
    return (
      drinkCategory.map(({ strCategory }, index) => renderCategoryBar(strCategory, index))
    );
  }

  return (
    <>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => resetFilter() }
      >
        All
      </button>
      {recipeType === 'meals'
        ? renderCategoryMeals()
        : renderCategoryDrink()}

    </>
  );
}

export default CategoriesBar;

CategoriesBar.propTypes = {
  recipeType: PropTypes.string.isRequired,
};
