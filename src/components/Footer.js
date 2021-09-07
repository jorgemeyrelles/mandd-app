import React from 'react';
import { Navbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <Navbar
      style={ {
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: '#F2490C',
        bottom: 0,
        position: 'fixed',
        width: '100%',
        borderRadius: '15px 15px 0 0',
      } }
      data-testid="footer"
    >
      <div
        role="button"
        onClick={ () => history.push('/mandd-app/comidas') }
        onKeyPress={ () => history.push('/mandd-app/comidas') }
        tabIndex="0"
      >
        <img data-testid="food-bottom-btn" src={ mealIcon } alt="food icon" />
      </div>
      <div
        role="button"
        onClick={ () => history.push('/mandd-app/explorar') }
        onKeyPress={ () => history.push('/mandd-app/explorar') }
        tabIndex="0"
      >
        <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="explore icon" />
      </div>
      <div
        role="button"
        onClick={ () => history.push('/mandd-app/bebidas') }
        onKeyPress={ () => history.push('/mandd-app/bebidas') }
        tabIndex="0"
      >
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drink icon" />
      </div>
    </Navbar>
  );
}

export default Footer;
