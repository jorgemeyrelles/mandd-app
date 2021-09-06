import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const user = localStorage.getItem('user');
  const email = user ? JSON.parse(user).email : 'E-mail não encontrado';
  const history = useHistory();

  return (
    <div>
      <Header title="Profile" />
      <section className="container-profile">
        <div style={ { display: 'flex', justifyContent: 'center' } }>
          <h5 data-testid="profile-email">{ email }</h5>
        </div>
        <Button
          className="button-style"
          variant="dark"
          size="lg"
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Done recipes
        </Button>
        <Button
          className="button-style"
          variant="dark"
          size="lg"
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Favorite recipes
        </Button>
        <Button
          style={ { background: '#333333' } }
          className="button-style"
          variant="dark"
          size="lg"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => { localStorage.clear(); history.push('/'); } }
        >
          Exit
        </Button>
      </section>
      <Footer />
    </div>
  );
}
