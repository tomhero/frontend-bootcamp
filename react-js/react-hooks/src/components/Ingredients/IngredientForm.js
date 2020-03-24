import React, { useState } from 'react';
import LoadingIndicator from "../UI/LoadingIndicator";

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);

  const titleInputHandler = event => {
    setTitle(event.target.value);
  }

  const amountInputHandler = event => {
    setAmount(+event.target.value);
  }

  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({title: title, amount: amount})
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={title} onChange={titleInputHandler}/>
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={amount} onChange={amountInputHandler}/>
          </div>
          <div className="ingredient-form__actions">
            <button type="submit" onClick={submitHandler}>Add Ingredient</button>
            { props.loading && <LoadingIndicator /> }
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
