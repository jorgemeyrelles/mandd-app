import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CardsListByIngredient from '../../components/CardsListByIngredient';

export default function FoodExplorerByIngredients() {
  return (
    <>
      <Header title="By Ingredients" />
      <CardsListByIngredient />
      <Footer />
    </>
  );
}
