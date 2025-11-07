// src/App.jsx

import { useState, useEffect } from 'react';
import './App.css';

const App = () => {

  const [starships, setStarships] = useState([]);
  const [starshipCount, setStarshipCount] = useState([]);

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
    // setCity(event.target.value);
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = await fetch(
      BASE_URL
    );

    console.log(response);
    let JSONdata = await response.json();
    console.log(JSONdata)

    // setLocation(JSONdata.location.name)
    // setTemperature(JSONdata.current.temp_f)
    // setConditions(JSONdata.current.condition.text)

  }


  return (
    <>
      {/* <form onSubmit={handleSubmit}>
        Please enter your city name for the weather:
        <input type="text" onChange={handleChange} />
        <input type="submit" value="Get my forecast!" />
      </form> */}
      <h1> Starships ({starshipCount})</h1>
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