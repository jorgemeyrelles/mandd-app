import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function NotFound() {
  const history = useHistory();
  const hrefImg = 'https://neilpatel.com/wp-content/uploads/2019/05/ilustracao-sobre-o-error-404-not-found.jpeg';
  const footerStyle = {
    border: '1px solid black',
    position: 'fixed',
    bottom: '0',
    width: '100%',
  };
  return (
    <div style={ { margin: '20px 0 20px 0' } }>
      <div
        style={ { textAlign: 'center', marginBottom: '40px' } }
      >
        <Button
          onClick={ () => history.push('/') }
        >
          Go back to Login
        </Button>
      </div>
      <img style={ { width: '100%' } } src={ hrefImg } alt="Not found img" />
      <footer
        style={ footerStyle }
      >
        <div style={ { fontSize: '10px', textAlign: 'center', fontStyle: 'italic' } }>
          site desenvolvido por Jorge Meyrelles Jr - Todos os direitos reservados
        </div>
      </footer>
    </div>
  );
}
