// Модуль для работы с API Star Wars. 
// Все методы обращаются к стороннему сервису, запрашивают данные у него.
// Методы асинхронны, они возвращают Promise.

// Есть следующие методы:
// starWars.searchCharacters(query), 
// starWars.searchPlanets(query), 
// starWars.searchSpecies(query).
// starWars.getCharactersById(id), 
// starWars.getPlanetsById(id), 
// starWars.getSpeciesById(id)


// Код ниже разбирать не нужно. 
// Всё, что вам необходимо знать: эти методы умеют получать данные и возвращают промисы.
// Поробуйте запустить их в своем скрипте search.ts.

interface Data {
  results: {_: [], homeworld: any, name: string, detail: string}[];
}

const starWars: any = {

  // --- Search Methods ---

  searchCharacters: <T extends Data>(query: string): Promise<T> => {
    return new Promise((resolve) => {
      fetch(`https://swapi.py4e.com/api/people/?search=${query}`)
        .then(response => response.json())
        .then(characters => resolve(characters))
        .catch(err => console.log('searchCharacters error: ', err));
    });
  },

  searchPlanets: (query: string) => {
    return new Promise((resolve) => {
      fetch(`https://swapi.py4e.com/api/planets/?search=${query}`)
        .then(response => response.json())
        .then(planets => resolve(planets))
        .catch(err => console.log('searchPlanets error: ', err));
    });
  },

  searchPlanet: (query: string) => {
    return new Promise((resolve) => {
      fetch(`${query}`)
          .then(response => response.json())
          .then(planets => resolve(planets))
          .catch(err => console.log('searchPlanets error: ', err));
    });
  },

  searchSpecies: (query: string) => {
    return new Promise((resolve) => {
      fetch(`https://swapi.py4e.com/api/species/?search=${query}`)
        .then(response => response.json())
        .then(species => resolve(species))
        .catch(err => console.log('searchSpecies error: ', err));
    });
  },

  // --- Get By Id Methods ---

  getCharactersById: async <T extends Data>(id: number): Promise<T> => (await (
    await fetch(`https://swapi.py4e.com/api/people/${id}`)
  ).json()),

  getPlanetsById: async (id: number) => (await (
    await fetch(`https://swapi.py4e.com/api/planets/${id}`)
  ).json()),

  getSpeciesById: async (id: number) => (await (
    await fetch(`https://swapi.py4e.com/api/species/${id}`)
  ).json()),

  getFilmsById: async (id: number) => (await (
    await fetch(`https://swapi.py4e.com/api/films/${id}`)
  ).json()),

  replaceResult: async (keys: string[], values: any, homeworld: string) => {
    for (let i = keys.length - 1; i >= 0; i--) {
      if ((keys[i] === 'films' && JSON.stringify(values[i]) !== '[]') || (keys[i] === 'species' && JSON.stringify(values[i]) !== '[]') || (keys[i] === 'vehicles' && JSON.stringify(values[i]) !== '[]') || (keys[i] === 'starships' && JSON.stringify(values[i]) !== '[]') || (keys[i] === 'residents' && JSON.stringify(values[i]) !== '[]') || (keys[i] === 'people' && JSON.stringify(values[i]) !== '[]') || (keys[i] === 'planets' && JSON.stringify(values[i]) !== '[]') || (keys[i] === 'characters' && JSON.stringify(values[i]) !== '[]')) {
        const valuesChanged = values[i].join(',').replace(/,/g, '<br/>    ');
        resultContainerContent.insertAdjacentHTML('afterbegin',
            `<p>${keys[i]}:<br/>    ${valuesChanged}</p>`
        );
      } else if (keys[i] === 'homeworld' && values[i]) {
        const homeWorld = await starWars.searchPlanet(homeworld) as {
          name: string
        }
        resultContainerContent.insertAdjacentHTML('afterbegin',
            `<p>${keys[i]}: ${homeWorld.name}</p>`
        );
      } else {
        resultContainerContent.insertAdjacentHTML('afterbegin',
            `<p>${keys[i].replace(/_/g, " ")}: ${values[i]}</p>`
        );
      }
    }
  }
}
