import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Explorer() {
  const history = useHistory();
  return (
    <>
      <Header title="Explore" />
      <section className="container-buttons">
        <Button
          variant="dark"
          size="lg"
          className="button-style"
          type="button"
          data-testid="explore-food"
          onClick={ () => history.push('/explorar/comidas') }
        >
          Explore Foods
        </Button>
        <Button
          variant="dark"
          size="lg"
          className="button-style"
          type="button"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explorar/bebidas') }
        >
          Explore Drinks
        </Button>
      </section>
      <Footer />
    </>
  );
}
