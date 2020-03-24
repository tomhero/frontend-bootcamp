import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [filterKeyword, setFilterKeyword] = useState('');

  useEffect(() => {
    const query = filterKeyword.length === 0
      ? ''
      : `?orderBy="title"&equalTo="${filterKeyword}"`;
    fetch('https://react-learning-5f3ed.firebaseio.com/hook-ingredients.json' + query)
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
        onLoadIngredients(loadedIngredients);
      })
  }, [filterKeyword, onLoadIngredients])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" 
            value={filterKeyword}
            onChange={event => setFilterKeyword(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
