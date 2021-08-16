import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';

export default class DoneRecipes extends Component {
  constructor() {
    super();
    this.state = {
      doneRecipes: [],
      filter: '',
    };
    this.saveState = this.saveState.bind(this);
  }

  componentDidMount() {
    this.saveState();
  }

  saveState() {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    this.setState({
      doneRecipes,
    });
  }

  filterButtons(getFilters) {
    this.setState({
      filter: getFilters,
    });
  }

  render() {
    const { doneRecipes, filter } = this.state;
    return (
      <div>
        <Header title="Receitas Feitas" search={ false } />
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => this.filterButtons('') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => this.filterButtons('comida') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => this.filterButtons('bebida') }
        >
          Drinks
        </button>
        {doneRecipes && doneRecipes.filter((item) => item.type.includes(filter))
        .map((item, index) => {
          if (item.type === 'comida') {
            return (
              <li key={ index }>
                <Link to={ `/comidas/${item.id}` }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ item.image }
                    alt="card-img"
                    width="300px"
                    height="200px"
                  />
                </Link>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${item.area} - ${item.category}`}
                </p>
                <Link to={ `/comidas/${item.id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
                </Link>
                <p
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  {`Feita em: ${item.doneDate}`}
                </p>
                <p
                  data-testid={ `${index}-${item.tags[0]}-horizontal-tag` }
                >
                  {item.tags[0]}
                </p>
                <p
                  data-testid={ `${index}-${item.tags[1]}-horizontal-tag` }
                >
                  {item.tags[1]}
                </p>
                <ShareButton test={ `${index}-horizontal-share-btn` } id={ item.id } />
              </li>
            );
          }

          return (
            <li key={ index }>
              <Link to={ `/bebidas/${item.id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ item.image }
                  alt="card-img"
                  width="300px"
                  height="200px"
                />
              </Link>
              <p data-testid={ `${index}-horizontal-top-text` }>{item.alcoholicOrNot}</p>
              <Link to={ `/bebidas/${item.id}` }>
                <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
              </Link>
              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                {`Feita em: ${item.doneDate}`}
              </p>
              <ShareButton test={ `${index}-horizontal-share-btn` } id={ item.id } />
            </li>
          );
        })}
      </div>
    );
  }
}
