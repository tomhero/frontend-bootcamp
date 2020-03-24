import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';

import ErrorModal from '../UI/ErrorModal'

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    // This will run every re-render cycle (when ingredients has been changed)
    console.log('RENDERING INGREDIENTS...', ingredients)
  }, [ingredients])

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setIngredients(filteredIngredients);
  }, [])

  const addIngredientHandler = ingredient => {
    setIsLoading(true);
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
        setIsLoading(false)
        setIngredients(
          prevIngredients => [
            ...prevIngredients,
            { id: responseData.name, ...ingredient }
          ]
        );
      })
      .catch(error => {
        console.error(error);
        setError('Something went wrong!');
      });
  }

  const removeIngredientHandler = ingredientId => {
    setIsLoading(true);
    fetch(`https://react-learning-5f3ed.firebaseio.com/hook-ingredients/${ingredientId}.json`, {
      method: 'DELETE'
    }
    ).then(_response => {
      setIsLoading(false);
      setIngredients(prevIngredients => {
        return prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
      })
    })
      .catch(error => {
        console.error(error);
        setError('Something went wrong!');
      });
  }

  const clearError = () => {
    // NOTE `setSomthing` will run synchronously after this function was called
    setError(null);
    setIsLoading(false);
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
