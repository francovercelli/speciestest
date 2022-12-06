import * as React from 'react';
import { useEffect, useState } from 'react';
import Species from '../Species';

const SPECIES_IMAGES = {
    droid:
        'https://static.wikia.nocookie.net/starwars/images/f/fb/Droid_Trio_TLJ_alt.png',
    human:
        'https://static.wikia.nocookie.net/starwars/images/3/3f/HumansInTheResistance-TROS.jpg',
    trandoshan:
        'https://static.wikia.nocookie.net/starwars/images/7/72/Bossk_full_body.png',
    wookie:
        'https://static.wikia.nocookie.net/starwars/images/1/1e/Chewbacca-Fathead.png',
    yoda: 'https://static.wikia.nocookie.net/starwars/images/d/d6/Yoda_SWSB.png',
};

const YODA_NAME = `yoda's species`;

export default function SpeciesItem(props) {
    const [specieInformation, setSpecieInformation] = useState(null);
    const [specieImage, setSpecieImage] = useState("");
    const [specieName, setSpecieName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingImage, setIsLoadingImage] = useState(true);

    useEffect(() => {
        async function getSpecieInformation() {
            await fetch(props.url)
                .then((response) => response.json())
                .then((data) => {
                    setSpecieInformation(data);
                    setSpecieName(data.name.toLowerCase());

                })
                .finally(() => {
                    setIsLoading(false)
                })
        }

        getSpecieInformation();
    }, [props.url])

    useEffect(() => {
        function getImageUrl() {
            for (const [key, value] of Object.entries(SPECIES_IMAGES)) {
                if (`${key}` === specieName) {
                    setSpecieImage(`${value}`)
                }
                if (specieName === YODA_NAME) {
                    setSpecieImage(SPECIES_IMAGES.yoda);
                }

            }
            setIsLoadingImage(false)
        }

        getImageUrl();
    }, [specieName])


    return (
        <> {!isLoadingImage && !isLoading ?
            <Species
                name={specieInformation.name}
                classification={specieInformation.classification}
                designation={specieInformation.designation}
                height={specieInformation.average_height}
                image={specieImage}
                numFilms={specieInformation.films.length}
                language={specieInformation.language} />
            : null
        }
        </>
    );
}