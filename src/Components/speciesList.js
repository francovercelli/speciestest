import * as React from 'react';
import { useEffect, useState } from 'react';
import SpeciesItem from './speciesItem';

const API_URL = 'https://swapi.dev/api/films/2/';

export default function SpeciesList(props) {
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

    return (<> {!isLoading ?
        <div className="App">
            <h1>Empire Strikes Back - Species Listing</h1>
            <div className="App-species" >
                {species.map(specie => (
                    <SpeciesItem key={specie} url={specie} ></SpeciesItem>
                ))
                }
            </div>
        </div>

        :
        <div className="App">
            <h1>Loading...</h1>
        </div>
    }
    </>
    );
}