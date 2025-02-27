import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import fetchByFilter from '../services/data';
import { SearchBarContext } from '../context/SearchBar';

export default function CardsListByIngredient() {
  const [ingredName, setIngredName] = useState([]);
  const [imge, setImge] = useState([]);
  const [redirectTo, setRedirectTo] = useState(false);
  const path = window.location.pathname.split('/')[3];
  const { setIngred } = useContext(SearchBarContext);
  const url = path === 'bebidas' ? 'thecocktaildb' : 'themealdb';

  useEffect(() => {
    const getRecipes = async () => {
      const urlToFetch = `https://www.${url}.com/api/json/v1/1/list.php?i=list`;
      const recipesFromApi = await fetchByFilter(urlToFetch);
      const recipesList = Object.values(recipesFromApi)[0];
      const array = path === 'bebidas'
        ? recipesList.map((e) => (e.strIngredient1))
        : recipesList.map((e) => (e.strIngredient));
      return setIngredName(array);
    };

    getRecipes();
  }, [path, url]);

  useEffect(() => {
    const getCategories = async () => {
      const img = ingredName.map((e) => ({
        fig: `https://www.${url}.com/images/ingredients/${e}-Small.png`,
        name: `${e}`,
      }));
      const magicN = 12;
      setImge(img.slice(0, magicN));
    };

    getCategories();
  }, [path, ingredName]);

  const handleClick = (value) => {
    setIngred(value);
    setRedirectTo(true);
  };

  const card = () => (
    <div style={ { position: 'relative', margin: '75px 0 70px 0' } }>
      { imge.map((e, i) => (
        <Card
          style={ { margin: '10px auto', width: '304px', boxShadow: '0 0 5px' } }
          role="button"
          data-testid={ `${i}-ingredient-card` }
          type="button"
          key={ i }
          onClick={ () => handleClick(e.name) }
          onKeyPress={ () => handleClick(e.name) }
          tabIndex="0"
        >
          <Card.Body
            style={
              { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
            }
          >
            <img
              style={ { width: '100px' } }
              src={ e.fig }
              alt={ `figure ${e.name}` }
              data-testid={ `${i}-card-img` }
            />
            <p
              style={ { fontSize: '20px', fontWeight: 'bold', textAlign: 'right' } }
              data-testid={ `${i}-card-name` }
            >
              { e.name }
            </p>
          </Card.Body>
        </Card>
      )) }
      { redirectTo && <Redirect to={ `/mandd-app/${path}` } /> }
    </div>
  );

  const isLoading = () => (
    <div className="d-flex justify-content-center">
      <div
        style={ { marginTop: '175px' } }
        className="spinner-border text-danger"
        role="status"
      >
        <span className="visually-hidden">.</span>
      </div>
    </div>
  );

  return (
    imge.length === 0 ? isLoading() : card()
  );
}
CardsListByIngredient.propTypes = {
  fetchType: PropTypes.string,
}.isRequired;
