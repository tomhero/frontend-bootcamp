import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch('https://react-learning-5f3ed.firebaseio.com/hook-ingredients.json')
      .then(response => response.json())
      .then(ingredients => {
        const loadedIngredients = [];
        Object.keys(ingredients).forEach(ingredientKey => {
          loadedIngredients.push({
            id: ingredientKey,
            title: ingredients[ingredientKey].title,
            amount: ingredients[ingredientKey].amount
          });
        })
        return loadedIngredients;
      })
      .then(loadedIngredients => {
        setIngredients(loadedIngredients);
      });
      // You have to do `[]` if you need to run it only once after the first render!!
  }, []);

  useEffect(() => {
    // This will run every re-render cycle (when ingredients has been changed)
    console.log('RENDERING INGREDIENTS...', ingredients)
  }, [ingredients])

  const addIngredientHandler = ingredient => {
    fetch('https://react-learning-5f3ed.firebaseio.com/hook-ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient)
      // headers: {
      //   'Content-Type:': 'application/json'
      // }
    }
    )
      .then(response => response.json())
      .then(responseData => {
        // NOTE : You must merge array to set new state for array type
        setIngredients(
          prevIngredients => [
            ...prevIngredients,
            { id: responseData.name, ...ingredient }
          ]
        );
      })
      .catch(error => console.log(error));
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList ingredients={ingredients} onRemoveItem={() => { }} />
      </section>
    </div>
  );
}

export default Ingredients;
