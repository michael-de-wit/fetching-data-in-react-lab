// src/App.jsx

import { useState, useEffect } from 'react';
import './App.css';

const App = () => {

  const [starships, setStarships] = useState([]);

  const BASE_URL = `https://swapi.dev/api/starships/?format=json`;


  useEffect(() => {
    // console.log("use");
    const getData = async () => {

      let response = await fetch(BASE_URL)
      // console.log(response);
      let JSONdata = await response.json(response)

      console.log(JSONdata.results)

      setStarships(JSONdata.results)

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
      <form onSubmit={handleSubmit}>
        Please enter your city name for the weather:
        <input type="text" onChange={handleChange} />
        <input type="submit" value="Get my forecast!" />
      </form>
      {/* add the below */}
      <h1> Starships:</h1>
      <ul>
        {starships.map((starship, index) => (
          <li key={index}>
            <p className='starship'>{starship.name}</p>
          </li>
        ))}
      </ul>
      {/* <p>Temperature: {temperature}</p> */}
      {/* <p>Conditions: {conditions}</p> */}
    </>
  );
}

export default App