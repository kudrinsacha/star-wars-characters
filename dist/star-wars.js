"use strict";
var serverDTO;
(function (serverDTO) {
    serverDTO.starWars = {
        searchCharacters: (query) => {
            return new Promise((resolve) => {
                fetch(`https://swapi.py4e.com/api/people/?search=${query}`)
                    .then(response => response.json())
                    .then(characters => resolve(characters))
                    .catch(err => console.log('searchCharacters error: ', err));
            });
        },
        searchPlanets: (query) => {
            return new Promise((resolve) => {
                fetch(`https://swapi.py4e.com/api/planets/?search=${query}`)
                    .then(response => response.json())
                    .then(planets => resolve(planets))
                    .catch(err => console.log('searchPlanets error: ', err));
            });
        },
        searchPlanet: (query) => {
            return new Promise((resolve) => {
                fetch(`${query}`)
                    .then(response => response.json())
                    .then(planets => resolve(planets))
                    .catch(err => console.log('searchPlanets error: ', err));
            });
        },
        searchSpecies: (query) => {
            return new Promise((resolve) => {
                fetch(`https://swapi.py4e.com/api/species/?search=${query}`)
                    .then(response => response.json())
                    .then(species => resolve(species))
                    .catch(err => console.log('searchSpecies error: ', err));
            });
        },
        getCharactersById: async (id) => {
            if (id <= 0 || id >= 89) {
                return {
                    name: 'Error',
                    error: 'Not Found'
                };
            }
            const res = await fetch(`https://swapi.py4e.com/api/people/${id}`);
            return res.json();
        },
        getPlanetsById: async (id) => {
            if (id <= 0 || id >= 62) {
                return {
                    name: 'Error',
                    error: 'Not Found'
                };
            }
            const res = await fetch(`https://swapi.py4e.com/api/planets/${id}`);
            return res.json();
        },
        getSpeciesById: async (id) => {
            if (id <= 0 || id >= 38) {
                return {
                    name: 'Error',
                    error: 'Not Found'
                };
            }
            const res = await fetch(`https://swapi.py4e.com/api/species/${id}`);
            return res.json();
        },
        getFilmsById: async (id) => {
            if (id <= 0 || id >= 8) {
                return {
                    name: 'Error',
                    error: 'Not Found'
                };
            }
            const res = await fetch(`https://swapi.py4e.com/api/films/${id}`);
            return res.json();
        },
        replaceResult: async (keys, values, resultContainerContent, homeworld) => {
            for (let i = keys.length - 1; i >= 0; i--) {
                if ((keys[i] === 'films' && JSON.stringify(values[i]) !== '[]') || (keys[i] === 'species' && JSON.stringify(values[i]) !== '[]') || (keys[i] === 'vehicles' && JSON.stringify(values[i]) !== '[]') || (keys[i] === 'starships' && JSON.stringify(values[i]) !== '[]') || (keys[i] === 'residents' && JSON.stringify(values[i]) !== '[]') || (keys[i] === 'people' && JSON.stringify(values[i]) !== '[]') || (keys[i] === 'planets' && JSON.stringify(values[i]) !== '[]') || (keys[i] === 'characters' && JSON.stringify(values[i]) !== '[]')) {
                    const value = values[i];
                    const valuesChanged = value.join(',').replace(/,/g, '<br/>    ');
                    resultContainerContent.insertAdjacentHTML('afterbegin', `<p>${keys[i]}:<br/>    ${valuesChanged}</p>`);
                }
                else if (keys[i] === 'homeworld' && values[i]) {
                    const homeWorld = await serverDTO.starWars.searchPlanet(homeworld);
                    resultContainerContent.insertAdjacentHTML('afterbegin', `<p>${keys[i]}: ${homeWorld.name}</p>`);
                }
                else {
                    resultContainerContent.insertAdjacentHTML('afterbegin', `<p>${keys[i].replace(/_/g, " ")}: ${values[i]}</p>`);
                }
            }
        }
    };
})(serverDTO || (serverDTO = {}));
