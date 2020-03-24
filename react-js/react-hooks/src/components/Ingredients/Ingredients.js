import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    // This will run every re-render cycle (when ingredients has been changed)
    console.log('RENDERING INGREDIENTS...', ingredients)
  }, [ingredients])

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setIngredients(filteredIngredients);
  }, [])

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
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={() => { }} />
      </section>
    </div>
  );
}

export default Ingredients;
