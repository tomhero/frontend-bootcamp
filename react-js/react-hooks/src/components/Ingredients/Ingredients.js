import React, { useReducer, useEffect, useCallback } from 'react';

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

const httpReducer = (currentHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null }
    case 'RESPONSE':
      return { ...currentHttpState, loading: false }
    case 'ERROR':
      return { loading: false, error: action.errorMessage }
    case 'CLEAR':
      return { ...currentHttpState, error: null }
    default:
      throw new Error('Should not get there!!');
  }
}

function Ingredients() {
  // NOTE : The 2nd agrs of useReducer is initialization of ingredient array
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null });

  // const [ingredients, setIngredients] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  useEffect(() => {
    // This will run every re-render cycle (when ingredients has been changed)
    console.log('RENDERING INGREDIENTS...', ingredients)
  }, [ingredients])

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    // setIngredients(filteredIngredients);
    dispatch({ type: 'SET', ingredients: filteredIngredients })
  }, [])

  const addIngredientHandler = ingredient => {
    dispatchHttp({type: 'SEND'});
    fetch('https://react-learning-5f3ed.firebaseio.com/hook-ingredients.jon', {
      method: 'POST',
      body: JSON.stringify(ingredient)
    }
    )
      .then(response => response.json())
      .then(responseData => {
        // NOTE : You must merge array to set new state for array type
        dispatchHttp({type: 'RESPONSE'})
        dispatch({
          type: 'ADD', ingredient: {
            id: responseData.name,
            ...ingredient
          }
        })
      })
      .catch(error => {
        console.error(error);
        dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong!' });
      });
  }

  const removeIngredientHandler = ingredientId => {
    dispatchHttp({type: 'SEND'});
    fetch(`https://react-learning-5f3ed.firebaseio.com/hook-ingredients/${ingredientId}.json`, {
      method: 'DELETE'
    }
    ).then(_response => {
      dispatchHttp({type: 'RESPONSE'})
      dispatch({ type: 'DELETE', id: ingredientId });
    })
      .catch(error => {
        console.error(error);
        dispatchHttp({ type: 'ERROR', errorMessage: error.message })
      });
  }

  const clearError = () => {
    dispatchHttp({ type: 'CLEAR' });
  }

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={httpState.loading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
