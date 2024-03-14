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
// Поробуйте запустить их в своем скрипте search.js.

const starWars = {

  // --- Search Methods ---

  searchCharacters: (query) => {
    return new Promise((resolve, reject) => {
      fetch(`https://swapi.py4e.com/api/people/?search=${query}`)
        .then(response => response.json())
        .then(characters => resolve(characters))
        .catch(err => console.log('searchCharacters error: ', err));
    });
  },

  searchPlanets: (query) => {
    return new Promise((resolve, reject) => {
      fetch(`https://swapi.py4e.com/api/planets/?search=${query}`)
        .then(response => response.json())
        .then(planets => resolve(planets))
        .catch(err => console.log('searchPlanets error: ', err));
    });
  },

  searchSpecies: (query) => {
    return new Promise((resolve, reject) => {
      fetch(`https://swapi.py4e.com/api/species/?search=${query}`)
        .then(response => response.json())
        .then(species => resolve(species))
        .catch(err => console.log('searchSpecies error: ', err));
    });
  },

  // --- Get By Id Methods ---

  getCharactersById: async (id) => (await (
    await fetch(`https://swapi.py4e.com/api/people/${id}`)
  ).json()),

  getPlanetsById: async (id) => (await (
    await fetch(`https://swapi.py4e.com/api/planets/${id}`)
  ).json()),

  getSpeciesById: async (id) => (await (
    await fetch(`https://swapi.py4e.com/api/species/${id}`)
  ).json()),

  getFilmsById: async (id) => (await (
    await fetch(`https://swapi.py4e.com/api/films/${id}`)
  ).json()),

  stringifyResult: (result) => {
    return `${JSON.stringify(result)
        .replace(/":/g, ': ')
        .replace(/":\[/g, ': [')
        .replace(/":n/g, ': n')
        .replace(/\[]/g, 'n/a')
        .replace(/,"/g, '<br/>')
        .replace(/],"/g, '<br/>')
        .replace(/l,"/g, 'l<br/>')
        .replace(/a,"/g, 'a<br/>')
        .replace(/\\r\\n/g, '<br/>')
        .replace(/[{}"\[\]]/g, '')
        .replace(/_/g, ' ')
        .replace(/films: https:\/\/swapi.py4e.com\/api/, 'films:<br/>https://swapi.py4e.com/api')
        .replace(/residents: https:\/\/swapi.py4e.com\/api/, 'residents:<br/>https://swapi.py4e.com/api')
        .replace(/people: https:\/\/swapi.py4e.com\/api/, 'people:<br/>https://swapi.py4e.com/api')
        .replace(/characters: https:\/\/swapi.py4e.com\/api/, 'characters:<br/>https://swapi.py4e.com/api')
        .replace(/planets: https:\/\/swapi.py4e.com\/api/, 'planets:<br/>https://swapi.py4e.com/api')
        .replace(/species: https:\/\/swapi.py4e.com\/api/, 'species:<br/>https://swapi.py4e.com/api')
        .replace(/vehicles: https:\/\/swapi.py4e.com\/api\/vehicles/g, 'vehicles:<br/>https://swapi.py4e.com/api/vehicles')
        .replace(/starships: https:\/\/swapi.py4e.com\/api\/starships/g, 'starships:<br/>https://swapi.py4e.com/api/starships')
        .replace(/https:\/\/swapi.py4e.com\/api\/films/g, '    https://swapi.py4e.com/api/films')
        .replace(/https:\/\/swapi.py4e.com\/api\/people/g, '    https://swapi.py4e.com/api/people')
        .replace(/https:\/\/swapi.py4e.com\/api\/vehicles/g, '    https://swapi.py4e.com/api/vehicles')
        .replace(/https:\/\/swapi.py4e.com\/api\/starships/g, '    https://swapi.py4e.com/api/starships')
        .replace(/https:\/\/swapi.py4e.com\/api\/planets/g, '    https://swapi.py4e.com/api/planets')
        .replace(/https:\/\/swapi.py4e.com\/api\/species/g, '    https://swapi.py4e.com/api/species')
        .replace(/url:     /g, 'url: ')
    }`
  }
}
