import React from 'react';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import { Provider } from '../../context/SearchBar';
import Footer from '../../components/Footer';

export default function DrinkExplorerByIngredients() {
  return (
    <>
      <Header />
      <Provider>
        <SearchBar fetchType="thecocktaildb" />
      </Provider>
      <h3>Drink Explorer por Ingredients</h3>
      <Footer />
    </>
  );
}
