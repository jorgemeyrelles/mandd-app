import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import InitialScreen from './pages/InitialScreen';
import Profile from './pages/Profile';
import Details from './pages/Details';
import Explore from './pages/Explore';
import ExploreDynamic from './pages/ExploreDynamic';
import SearchIngredients from './pages/SearchIngredients';
import OriginLocal from './pages/OriginLocal';
import DoneRecipes from './pages/DoneRecipes';
import FavouriteRecipes from './pages/FavouriteRecipes';
import NotFound from './pages/NotFound';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" render={ () => <InitialScreen type="Comidas" /> } />
      <Route exact path="/bebidas" render={ () => <InitialScreen type="Bebidas" /> } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/comidas/:id" component={ Details } />
      <Route exact path="/bebidas/:id" component={ Details } />
      <Route exact path="/comidas/:id/:inProgress" component={ Details } />
      <Route exact path="/bebidas/:id/:inProgress" component={ Details } />
      <Route exact path="/explorar" component={ Explore } />
      <Route
        exact
        path="/explorar/comidas"
        render={ () => (<ExploreDynamic type="Explorar Comidas" />) }
      />
      <Route
        exact
        path="/explorar/bebidas"
        render={ () => (<ExploreDynamic type="Explorar Bebidas" />) }
      />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        render={ () => <SearchIngredients type="comidas" /> }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        render={ () => <SearchIngredients type="bebidas" /> }
      />
      <Route exact path="/explorar/comidas/area" component={ OriginLocal } />
      <Route exact path="/receitas-feitas" component={ DoneRecipes } />
      <Route exact path="/receitas-favoritas" component={ FavouriteRecipes } />
      <Route exact path="/not-found" component={ NotFound } />
      <Redirect to="/not-found" />
    </Switch>
  );
}
