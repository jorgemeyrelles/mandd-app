import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Redirect } from 'react-router';
import manddLogo from '../images/mandd_3_sf.png';
import '../App.css';

function Login() {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [disabled, setDisabled] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  function handleChange({ target: { value, name } }) {
    setLogin({
      ...login,
      [name]: value,
    });
  }
  const msg = 'Welcome\nChange the screem size to mobile mode by "inspection" tool.\nTks';
  useEffect(() => {
    alert(msg);
  }, []);

  useEffect(() => {
    const { email, password } = login;
    const minPass = 6;
    const emailValid = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (emailValid.test(email) && password.length > minPass) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [login]);

  function submitBtn() {
    const { email } = login;
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    setShouldRedirect(true);
  }

  const styleText = {
    fontWeight: 'bold',
    color: 'black',
    textShadow: '0 0 6px grey',
  };

  return (
    <main className="main-login">
      { shouldRedirect && <Redirect to="/mandd-app/comidas" /> }
      <img src={ manddLogo } alt="logo" style={ { width: '280px' } } />
      <h2 style={ styleText }>Login</h2>
      <Form className="container-login">
        <Form.Label htmlFor="id">
          <Form.Control
            id="id"
            type="email"
            data-testid="email-input"
            placeholder="Email"
            name="email"
            onChange={ handleChange }
          />
        </Form.Label>
        <Form.Label htmlFor="password">
          <Form.Control
            id="password"
            type="password"
            data-testid="password-input"
            placeholder="Password"
            name="password"
            onChange={ handleChange }
          />
        </Form.Label>
        <Button
          variant="secondary"
          className="button transition"
          type="button"
          data-testid="login-submit-btn"
          disabled={ disabled }
          onClick={ submitBtn }
        >
          Enter
        </Button>
      </Form>
    </main>
  );
}

export default Login;
