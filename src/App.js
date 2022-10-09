import React from 'react';
import './index.scss';
import { Collection } from './Collection';

const categories = [
  { name: 'All' },
  { name: 'Mountains' },
  { name: 'Sea' },
  { name: 'Architecture' },
  { name: 'Cities' },
];

function App() {
  const [searchValue, setSearchValue] = React.useState('');
  const [collections, setCollections] = React.useState([]);
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    setIsLoading(true);
    const category = categoryId ? `category=${categoryId}` : '';
    fetch(`https://63427d07ba4478d4783c9880.mockapi.io/photos?page=${page}&limit=3&${category}`)
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        console.log('Error while getting data');
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);
  return (
    <div className="App">
      <h1>My photo collection</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((obj, i) => (
            <li
              onClick={() => setCategoryId(i)}
              className={categoryId === i ? 'active' : ''}
              key={obj.name}>
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Search by name"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          collections
            .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLocaleLowerCase()))
            .map((obj, index) => <Collection key={index} name={obj.name} images={obj.photos} />)
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, i) => (
          <li key={i} onClick={() => setPage(i + 1)} className={page === i + 1 ? 'active' : ''}>
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
