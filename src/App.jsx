// src/App.jsx

import { useState, useEffect } from 'react';
import './App.css';

import Results from './components/Results/Results.jsx';


const App = () => {

  const [starshipCount, setStarshipCount] = useState([]);
  const [starshipToSearch, setStarshipToSearch] = useState([]);
  const [starships, setStarships] = useState([]);

  const BASE_URL = `https://swapi.dev/api/starships/?format=json`;


  useEffect(() => {
    // console.log("use");
    const getData = async () => {

      let response = await fetch(BASE_URL)
      // console.log(response);
      let JSONdata = await response.json(response)

      // console.log(JSONdata.results);
      setStarships(JSONdata.results)
      setStarshipCount(JSONdata.results.length)
      // console.log('STAR', starships);
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
    // console.log(`initial results`, JSONdata.results)
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


  }


  return (
    <>
      <h1> Starships ({starshipCount})</h1>
      <form onSubmit={handleSubmit}>
        Starship search:
        <input type="text" onChange={handleChange} />
        <input type="submit" value="Search" />
      </form>
      <Results starships={starships} />
    </>
  );
}

export default App