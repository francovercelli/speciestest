import { useEffect, useState } from 'react';
import './App.scss';
import SpeciesList from './speciesList';

const API_URL = 'https://swapi.dev/api/films/2/';

function App() {
  const [species, setSpecies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getSpecies() {
    await fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setSpecies(data.species))
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getSpecies();
  }, [])


  return (
    <> {!isLoading ?
      <div className="App">
        <h1>Empire Strikes Back - Species Listing</h1>
        <div className="App-species" >
          {species.map(specie => (
            <SpeciesList key={specie} url={specie} ></SpeciesList>
          ))
          }
        </div>
      </div>
      : <h1>Loading...</h1>
    }
    </>
  );
}

export default App;
