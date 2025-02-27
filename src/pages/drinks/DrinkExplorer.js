import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import fetchByFilter from '../../services/data';

export default function DrinkExplorer() {
  const history = useHistory();
  const [idRandomDrink, setIdRandomDrink] = useState('');

  useEffect(() => {
    const getRandomDrink = async () => {
      const urlToFetch = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
      const { drinks } = await fetchByFilter(urlToFetch);
      setIdRandomDrink(drinks[0].idDrink);
    };
    getRandomDrink();
  }, []);

  return (
    <>
      <Header title="Explore Drinks" />
      <section className="container-buttons">
        <Button
          className="button-style"
          variant="dark"
          size="lg"
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ () => history.push('/mandd-app/explorar/bebidas/ingredientes') }
        >
          By Ingredients
        </Button>
        <Button
          className="button-style"
          variant="dark"
          size="lg"
          data-testid="explore-surprise"
          type="button"
          onClick={ () => history.push(`/mandd-app/bebidas/${idRandomDrink}`) }
        >
          Surprise Me!
        </Button>
      </section>
      <Footer />
    </>
  );
}
