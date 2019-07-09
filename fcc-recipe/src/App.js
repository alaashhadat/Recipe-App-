import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {
  const APP_ID = 'f668d0c2';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    const GetRecipes = async () => {
      const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`,
      );
      const data = await response.json();
      setRecipes(data.hits);
    };
    GetRecipes();
  }, [query, search]);

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  console.log('search', search);
  console.log('query', query);

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-Button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
