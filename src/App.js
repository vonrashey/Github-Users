import React, { useState, useEffect } from 'react';
import { saveDataInIndexDB, getDataFromIndexDB } from './Utility.js';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState({
    query: '',
    url: '',
  });

  const handleBlur = (e) => {
    setSearch({
      query: e.target.value,
      url: `https://api.github.com/search/users?per page=30&q=${e.target.value}`,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { query } = search

    setSearch({
      url: `https://api.github.com/users/${query}`,
    })
  };

  useEffect(() => {
    async function fetchData() {
      const { query, url } = search

      if (query) {
        await fetch(encodeURI(url))
        .then((res) => res.json())
        .then((data) => {
          setUsers(data.items);
        });
      }
    }
  
    fetchData();
  }, [search]);


    saveDataInIndexDB(users);
    const getDataFromDB = async () => {
   let data = await getDataFromIndexDB();
  };



  return (
    <div className="mobile-container">
      <div className="header">Github User Search </div>
      <div className="search">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Github User"
            onBlur={handleBlur}
            className="header-input"
          />
          <button type="submit" className="header-button">Search</button>
        </form>
      </div>
      <div>
        {users && users.map(function(user) {
          return (
            <div className="card" key={user.id}>
              <img src={user.avatar_url} alt={user.name} />
              <div className="card-info">
                <h3 className="card-h4">{user.login}</h3>
                <h4><a className="card-h6" href={user.html_url}>View Profile</a></h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;