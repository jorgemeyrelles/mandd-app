import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './pages/Login';
import Foods from './pages/foods/Foods';
import FoodExplorer from './pages/foods/FoodExplorer';
import FoodExplorerByIngredients from './pages/foods/FoodExplorerByIngredients';
import FoodExplorerByCountry from './pages/foods/FoodExplorerByCountry';
import FoodRecipes from './pages/foods/FoodRecipes';
import Drinks from './pages/drinks/Drinks';
import DrinkExplorer from './pages/drinks/DrinkExplorer';
import DrinkExplorerByIngredients from './pages/drinks/DrinkExplorerByIngredients';
import DrinkRecipes from './pages/drinks/DrinkRecipes';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Explorer from './pages/Explorer';
import NotFound from './pages/NotFound';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  const pathFoods = '/mandd-app/explorar/comidas/ingredientes';
  const pathDrinks = '/mandd-app/explorar/bebidas/ingredientes';
  const pathByCountry = '/mandd-app/explorar/comidas/area';
  const pathDrinkInProgress = '/mandd-app/bebidas/:id/in-progress';
  const pathFoodInProgress = '/mandd-app/comidas/:id/in-progress';

  return (
    <Switch>
      <Route exact path="/mandd-app/" component={ Login } />
      <Route exact path="/mandd-app/perfil" component={ Profile } />
      <Route exact path="/mandd-app/explorar" component={ Explorer } />
      <Route exact path="/mandd-app/explorar/comidas" component={ FoodExplorer } />
      <Route exact path="/mandd-app/explorar/bebidas" component={ DrinkExplorer } />
      <Route exact path={ pathFoods } component={ FoodExplorerByIngredients } />
      <Route exact path={ pathDrinks } component={ DrinkExplorerByIngredients } />
      <Route exact path={ pathByCountry } component={ FoodExplorerByCountry } />
      <Route exact path="/mandd-app/comidas" component={ Foods } />
      <Route exact path="/mandd-app/bebidas" component={ Drinks } />
      <Route exact path="/mandd-app/comidas/:id" component={ FoodRecipes } />
      <Route exact path="/mandd-app/bebidas/:id" component={ DrinkRecipes } />
      <Route exact path="/mandd-app/perfil" component={ Profile } />
      <Route exact path="/mandd-app/receitas-feitas" component={ DoneRecipes } />
      <Route exact path="/mandd-app/receitas-favoritas" component={ FavoriteRecipes } />
      <Route exact path={ pathFoodInProgress } component={ RecipeInProgress } />
      <Route exact path={ pathDrinkInProgress } component={ RecipeInProgress } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

export default App;
