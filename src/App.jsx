// src/App.jsx

import { useState, useEffect } from 'react';
import './App.css';

const App = () => {

  const [starships, setStarships] = useState([]);
  const [starshipCount, setStarshipCount] = useState([]);
  const [starshipToSearch, setStarshipToSearch] = useState([]);

  const BASE_URL = `https://swapi.dev/api/starships/?format=json`;


  useEffect(() => {
    // console.log("use");
    const getData = async () => {

      let response = await fetch(BASE_URL)
      // console.log(response);
      let JSONdata = await response.json(response)

      console.log(JSONdata.results);
      setStarships(JSONdata.results)
      setStarshipCount(JSONdata.results.length)

    }

    // console.log("load");
    getData()

  }, []);



  const handleChange = (event) => {
    setStarshipToSearch(event.target.value);
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(starshipToSearch);

    const SEARCH_URL = `https://swapi.dev/api/starships/?search=${starshipToSearch}&format=json`;
    // console.log(SEARCH_URL);

    let response = await fetch(
      SEARCH_URL
    );

    // console.log(response);
    let JSONdata = await response.json();
    console.log(`initial results`, JSONdata.results)
    // console.log(`starships`, starships);

    const searchedStarships = JSONdata.results
    setStarships(searchedStarships)
    setStarshipCount(JSONdata.results.length)

    let nextPageUrl = JSONdata.next

    while(nextPageUrl != null) {
      console.log(`next page url`, nextPageUrl);
      let response = await fetch(nextPageUrl);
      let nextPageJSONdata = await response.json();
      console.log(`nextPageJSONdata`, nextPageJSONdata);
      console.log(`nextPageJSONdata.results`, nextPageJSONdata.results);
      let expandedStarships = [...searchedStarships, ...nextPageJSONdata.results]
      setStarships(expandedStarships)
      setStarshipCount(expandedStarships.length)
      nextPageUrl = nextPageJSONdata.next
      console.log(`nextPageUrl`, nextPageUrl);
    }

    // if(JSONdata.next != null) {
    //   const SEARCH_URL_NEXT_PAGE = JSONdata.next
    //   console.log('pre JSONdata', JSONdata);
      
      
    //   console.log('post JSONdata_next', JSONdata_next);


    // }
  }


  return (
    <>
      <h1> Starships ({starshipCount})</h1>
      <form onSubmit={handleSubmit}>
        Starship search:
        <input type="text" onChange={handleChange} />
        <input type="submit" value="Search" />
      </form>
      <ul>
        {starships.map((starship, index) => (
          <li key={index}>
            <p className='starship-name'>{starship.name}</p>
            <div className='starship-info-box'>
              <p className='starship-info'><span className='starship-info-label'>class</span>: {starship.starship_class}</p>
              <p className='starship-info'><span className='starship-info-label'>manufacturer</span>: {starship.manufacturer}</p>
              <p className='starship-info'><span className='starship-info-label'>model</span>: {starship.model}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App