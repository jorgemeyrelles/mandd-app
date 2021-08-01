import React, { useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavBtn({ data, recipeType }) {
  const [render, setRender] = useState(false);

  const id = recipeType === 'meals' ? data.idMeal : data.idDrink;
  const addFavorite = () => {
    const recipeInfo = {
      id,
      recipeType,
      area: recipeType === 'meals' ? data.strArea : '',
      alcoholicOrNot: recipeType === 'meals' ? '' : data.strAlcoholic,
      name: recipeType === 'meals' ? data.strMeal : data.strDrink,
      image: recipeType === 'meals' ? data.strMealThumb : data.strDrinkThumb,
    };
    if (localStorage.favoriteRecipes) {
      const favorites = JSON.parse(localStorage.favoriteRecipes);
      const newFavorites = [...favorites, recipeInfo];
      localStorage.favoriteRecipes = JSON.stringify(newFavorites);
      setRender(!render);
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([recipeInfo]));
      setRender(!render);
    }
  };

  const removeFavorite = () => {
    const favorites = JSON.parse(localStorage.favoriteRecipes);
    const newFavorites = favorites.filter((recipe) => recipe.id !== id);
    localStorage.favoriteRecipes = JSON.stringify(newFavorites);
    setRender(!render);
  };

  if (!localStorage.favoriteRecipes
    || !(JSON.parse(localStorage.favoriteRecipes)).find((recipe) => recipe.id === id)) {
    return (
      <button type="button" onClick={ addFavorite }>
        {console.log(data)}
        <img src={ whiteHeartIcon } alt="favorite icon" />
      </button>
    );
  }
  return (
    <button type="button" onClick={ removeFavorite }>
      {console.log(data)}
      <img src={ blackHeartIcon } alt="favorite icon" />
    </button>
  );
}

FavBtn.propTypes = {
  data: PropTypes.object,
  type: PropTypes.string,
}.isRequired;

export default FavBtn;
