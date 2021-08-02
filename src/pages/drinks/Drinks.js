import React, { useContext } from 'react';
import Header from '../../components/Header';
import RecipeCard from '../../components/RecipeCard';
import { RecipesContext } from '../../context/RecipesContext';
import { SearchBarProvider } from '../../context/SearchBar';
import Footer from '../../components/Footer';

export default function Drinks() {
  const { drinksFiltered, drinkCategories } = useContext(RecipesContext);

  return (
    <main>
      <SearchBarProvider>
        <Header title="Explorar Bebidas" search fetchType="thecocktaildb" />
      </SearchBarProvider>
      <section>
        { drinkCategories.length > 0 && drinkCategories.map((cat) => (
          <button
            type="button"
            key={ cat.strCategory }
            data-testid={ `${cat.strCategory}-category-filter` }
          >
            {cat.strCategory}
          </button>
        ))}
      </section>
      <section>
        { drinksFiltered.length > 0 && drinksFiltered.map((recipe, index) => (
          <RecipeCard recipe={ recipe } index={ index } type="Drink" key={ index } />
        ))}
      </section>
      <Footer />
    </main>
  );
}
