import React, { useReducer, useEffect, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';

import ErrorModal from '../UI/ErrorModal'

// use custom hook
import useMyHttp from '../../hooks/http';

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

function Ingredients () {
  // NOTE : The 2nd agrs of useReducer is initialization of ingredient array
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);

  const { isLoading, error, data, sendRequest, reqExtra, reqIdentifier } = useMyHttp();

  useEffect(() => {
    // NOTE : This will run every data variable (from custom hook) changed
    if (!isLoading && !error && reqIdentifier === 'REMOVE_INGREDIENT') {
      dispatch({ type: 'DELETE', id: reqExtra });
    } else if (!isLoading && !error && reqIdentifier === 'ADD_INGREDIENT') {
      dispatch({
        type: 'ADD', ingredient: {
          id: data.name,
          ...reqExtra
        }
      })
    }
  }, [data, reqExtra, reqIdentifier, isLoading, error]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    // setIngredients(filteredIngredients);
    dispatch({ type: 'SET', ingredients: filteredIngredients })
  }, []);

  const addIngredientHandler = useCallback(ingredient => {
    sendRequest(
      'https://react-learning-5f3ed.firebaseio.com/hook-ingredients.json',
      'POST',
      JSON.stringify(ingredient),
      'ADD_INGREDIENT'
    )
    // dispatchHttp({type: 'SEND'});
    // fetch('https://react-learning-5f3ed.firebaseio.com/hook-ingredients.json', {
    //   method: 'POST',
    //   body: JSON.stringify(ingredient)
    // }
    // )
    //   .then(response => response.json())
    //   .then(responseData => {
    //     // NOTE : You must merge array to set new state for array type
    //     dispatchHttp({type: 'RESPONSE'})
    //     dispatch({
    //       type: 'ADD', ingredient: {
    //         id: responseData.name,
    //         ...ingredient
    //       }
    //     })
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong!' });
    //   });
  }, [sendRequest]);

  const removeIngredientHandler = useCallback(ingredientId => {
    sendRequest(
      `https://react-learning-5f3ed.firebaseio.com/hook-ingredients/${ingredientId}.json`,
      'DELETE',
      null,
      ingredientId,
      'REMOVE_INGREDIENT'
    );
  }, [sendRequest])

  const clearError = useCallback(() => {
    // dispatchHttp({ type: 'CLEAR' });
  }, []);

  // not render IngredientList every Ingredients component render cycle
  const ingredientList = useMemo(() => {
    return (
      <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler} />
    )
    // NOTE : IngredientList will be rerendered after dependencies change.
  }, [ingredients, removeIngredientHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
