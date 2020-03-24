import React, { useReducer, useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';

import ErrorModal from '../UI/ErrorModal'

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get there!!');
  }
}

function Ingredients() {
  // NOTE : The 2nd agrs of useReducer is initialization of ingredient array
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);

  // const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    // This will run every re-render cycle (when ingredients has been changed)
    console.log('RENDERING INGREDIENTS...', ingredients)
  }, [ingredients])

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    // setIngredients(filteredIngredients);
    dispatch({type: 'SET', ingredients: filteredIngredients})
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
        // setIngredients(
        //   prevIngredients => [
        //     ...prevIngredients,
        //     { id: responseData.name, ...ingredient }
        //   ]
        // );
        dispatch({type: 'ADD', ingredient: {
          id: responseData.name,
          ...ingredient
        }})
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
      // setIngredients(prevIngredients => {
      //   return prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
      // });
      dispatch({type: 'DELETE', id: ingredientId});
    })
      .catch(error => {
        console.error(error);
        setError('Something went wrong!');
      });
  }

  const clearError = () => {
    // NOTE : `setSomthing` will run synchronously after this function was called
    setError(null);
    setIsLoading(false);
    // NOTE :  Keep in mind, that the new state value is only available in the next component render cycle
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
