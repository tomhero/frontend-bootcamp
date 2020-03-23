import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  const addIngredientHandler = ingredient => {
    // NOTE : You must merge array to set new state for array type
    setIngredients(
      prevIngredients => [
        ...prevIngredients,
        { id: Math.random().toString(), ...ingredient }
      ]
    );
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList ingredients={ingredients} onRemoveItem={() => {}} />
      </section>
    </div>
  );
}

export default Ingredients;
