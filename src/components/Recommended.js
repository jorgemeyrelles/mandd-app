import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import '../App.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Recommended({ value, type }) {
  const magicN = 6;
  const history = useHistory();
  const styleCard = {
    background: 'none',
    opacity: 'none',
    border: 'none',
  };
  const sixCards = value.map((e) => e).slice(0, magicN);
  const kind = () => {
    if (type === 'meal') {
      return (
        Object.entries(sixCards).map((e, i) => (
          <div
            role="button"
            style={ styleCard }
            onClick={ () => history.push(`/mandd-app/bebidas/${e[1].idDrink}`) }
            onKeyPress={ () => history.push(`/mandd-app/bebidas/${e[1].idDrink}`) }
            key={ i }
            tabIndex="0"
          >
            <div data-testid={ `${i}-recomendation-card` } key={ i }>
              <img
                style={ { borderRadius: '5px 5px 0 0' } }
                width="100px"
                src={ e[1].strDrinkThumb }
                alt={ `img ${e[1].strDrink}` }
              />
              <div
                className="card-recom-text"
                data-testid={ `${i}-recomendation-title` }
              >
                { e[1].strDrink }
              </div>
            </div>
          </div>
        ))
      );
    }
    return (
      Object.entries(sixCards).map((e, i) => (
        <div
          role="button"
          style={ styleCard }
          onClick={ () => history.push(`/mandd-app/comidas/${e[1].idMeal}`) }
          onKeyPress={ () => history.push(`/mandd-app/comidas/${e[1].idMeal}`) }
          tabIndex="0"
          key={ i }
        >
          <div data-testid={ `${i}-recomendation-card` } key={ i }>
            <img
              style={ { borderRadius: '5px' } }
              width="100px"
              src={ e[1].strMealThumb }
              alt={ `img ${e[1].strMeal}` }
            />
            <div
              className="card-recom-text"
              data-testid={ `${i}-recomendation-title` }
            >
              { e[1].strMeal }
            </div>
          </div>
        </div>
      ))
    );
  };

  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    <div style={ { margin: '0 30px 40px 30px', textAlign: '-webkit-center' } }>
      <Slider { ...settings }>
        {
          kind()
        }
      </Slider>
    </div>
  );
}

Recommended.propTypes = {
  value: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
};

export default Recommended;
