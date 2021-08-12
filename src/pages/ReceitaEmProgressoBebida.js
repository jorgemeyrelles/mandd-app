import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addDrinkRecipeDone } from '../actions';

class ReceitaEmProgressoBebida extends Component {
  constructor() {
    super();
    this.state = {
      cocktail: [],
      finalList: [],
      disabled: true,
      checked: [],
    };
    this.fetchAPI = this.fetchAPI.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.CopyToClipboard = this.CopyToClipboard.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getIngredientsFromLS = this.getIngredientsFromLS.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
  }

  handleChange() {
    // Retirado https://stackoverflow.com/questions/14800954/how-to-check-if-all-checkboxes-are-unchecked
    if (document.querySelectorAll('input[type="checkbox"]:checked').length
    === document.querySelectorAll('input[type="checkbox"]').length) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  handleClick(e) {
    const { target: { value } } = e;
    const { checked, finalList } = this.state;
    const { match: { params: { id } } } = this.props;
    const curr = !checked[value];
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (curr) {
      const obj = {
        ...inProgress,
        cocktails: {
          ...inProgress.cocktails,
          [id]: [...inProgress.cocktails[id], finalList[value]],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    } else {
      const newArray = inProgress.cocktails[id].filter((ing) => ing !== finalList[value]);
      const obj = {
        ...inProgress,
        cocktails: {
          ...inProgress.cocktails,
          [id]: newArray,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    }
    const base = -1;
    if (value !== base) {
      checked[value] = curr;
    }
    this.setState({
      checked,
    });
  }

  getIngredientsFromLS() {
    const { match: { params: { id } } } = this.props;
    const { finalList } = this.state;
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes === null) {
      const obj = {
        cocktails: {
          controle: '999999999999',
        },
        meals: {
          controle: '999999999999',
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    } else if (Object.hasOwnProperty.call(inProgressRecipes.meals, id)) {
      const array = JSON.stringify(inProgressRecipes.meals[id]);
      const prepareBooleans = (master, keys) => {
        const booleans = master.map((el) => keys.includes(el));
        return booleans;
      };
      this.setState({
        checked: prepareBooleans(finalList, array),
      });
    }
  }

  CopyToClipboard() { // https://orclqa.com/copy-url-clipboard/
    const inputc = document.body.appendChild(document.createElement('input'));
    inputc.value = window.location.href;
    inputc.focus();
    inputc.select();
    document.execCommand('copy');
    inputc.parentNode.removeChild(inputc);
    alert('Link copiado!');
  }

  async fetchAPI() {
    const { match: { params: { id } } } = this.props;
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
    const data = await response.json();
    const ingredientListBuffer = [];
    Object.keys(data.drinks[0]).forEach((e) => {
      if (e.includes('strIngredient')) {
        return ingredientListBuffer.push(e);
      }
    });
    this.setState({
      cocktail: data.drinks[0],
      ingredientList: ingredientListBuffer,
    }, () => {
      const { ingredientList, cocktail } = this.state;
      const doneList = ingredientList.map((e) => (cocktail[e]
        ? `${cocktail[e]} - ${cocktail[`strMeasure${e.match(/\d+/)[0]}`]}`
        : null)).filter(Boolean);
      this.setState({
        finalList: doneList,
      }, () => {
        this.getIngredientsFromLS();
      });
    });
  }

  render() {
    const { cocktail: { idDrink, strDrinkThumb, strDrink, strAlcoholic,
      strInstructions, strCategory }, finalList, disabled, checked } = this.state;
    const { addDoneRecipe, match: { params: { id } } } = this.props;
    const obj = {
      id: idDrink,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };
    return (
      <main>
        <img src={ strDrinkThumb } data-testid="recipe-photo" alt="imagem-da-receita" />
        <h1 data-testid="recipe-title">{ strDrink }</h1>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => this.CopyToClipboard() }
        >
          Compartilhar
        </button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <h2 data-testid="recipe-category">{ strCategory }</h2>
        <form onChange={ this.handleChange }>
          <ul>
            {finalList.map((ing, index) => (
              <li key={ ing } data-testid={ `${index}-ingredient-step` }>
                <span>
                  <input
                    type="checkbox"
                    value={ index }
                    checked={ checked[index] }
                    onClick={ (e) => this.handleClick(e) }
                  />
                </span>
                <span>{ ing }</span>
              </li>
            ))}
          </ul>
          <p data-testid="instructions">{strInstructions}</p>
          <Link to="/receitas-feitas">
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ disabled }
              onClick={ () => { addDoneRecipe(obj); } }
            >
              Finalizar receita
            </button>
          </Link>
          <Link
            to={ {
              pathname: `/bebidas/${id}`,
            } }
          >
            <button
              type="button"
            >
              Voltar para a página de detalhes
            </button>
          </Link>
        </form>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addDoneRecipe: (id) => dispatch(addDrinkRecipeDone(id)),
});

export default connect(null, mapDispatchToProps)(ReceitaEmProgressoBebida);

ReceitaEmProgressoBebida.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
}.isRequired;
