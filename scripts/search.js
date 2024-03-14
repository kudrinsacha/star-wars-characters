// Методы, которые могут пригодиться:
// starWars.searchCharacters(query), 
// starWars.searchPlanets(query), 
// starWars.searchSpecies(query).
// starWars.getCharactersById(id), 
// starWars.getPlanetsById(id), 
// starWars.getSpeciesById(id)

const fieldSearchByName = document.querySelector('.input-name');
const fieldSearchById = document.querySelector('.input-id');
const buttonSearchByName = document.getElementById('byQueryBtn');
const buttonSearchById = document.getElementById('byIdBtn');
const buttonSearchClose = document.querySelector('.delete');
const spinner = document.querySelector('.spinner');
const resultContainer = document.getElementById('result-container');

const resultContainerHeader = document.querySelector('.message-header > p');
const resultContainerContent = document.getElementById('content');

buttonSearchByName.onclick = function () {
    if (!fieldSearchByName.value) {
        resultContainer.classList.add('active');
        resultContainerHeader.innerHTML = 'error';
        resultContainerContent.innerHTML = 'please, write value';
    } else {
        const resource = document.getElementById('resource-select');
        let func;
        resultContainer.classList.remove('active');
        spinner.classList.add('active');
        switch (resource.value) {
            case 'people':
                func = 'searchCharacters';
                break;
            case 'planets':
                func = 'searchPlanets';
                break;
            case 'species':
                func = 'searchSpecies';
                break;
            default: func = '';
        }
        starWars[func](fieldSearchByName.value)
            .finally(() => spinner.classList.remove('active'))
            .then(async result => {
                if (result.results[0].homeworld && result.results[0].homeworld.includes('https://swapi.py4e.com/api/planets')) {
                    const planet = await starWars.getPlanetsById(result.results[0].homeworld.split('/')[5])
                    result.results[0].homeworld = planet.name;
                }
                resultContainer.classList.add('active');
                resultContainerHeader.innerHTML = `${result.results[0].name}`;
                resultContainerContent.innerHTML = starWars.stringifyResult(result.results[0]);
            })
            .catch(e => {
                resultContainer.classList.add('active');
                resultContainerHeader.innerHTML = 'error';
                resultContainerContent.innerHTML = 'not found';
            });
    }
}

buttonSearchById.onclick = function () {
    if (!fieldSearchById.value) {
        resultContainer.classList.add('active');
        resultContainerHeader.innerHTML = 'error';
        resultContainerContent.innerHTML = 'please, write value';
    } else {
        const resource = document.getElementById('resource-id-select');
        let func;
        resultContainer.classList.remove('active');
        spinner.classList.add('active');
        switch (resource.value) {
            case 'people':
                func = 'getCharactersById';
                break;
            case 'planets':
                func = 'getPlanetsById';
                break;
            case 'species':
                func = 'getSpeciesById';
                break;
            case 'films':
                func = 'getFilmsById';
                break;
            default: func = '';
        }
        starWars[func](fieldSearchById.value)
            .finally(() => spinner.classList.remove('active'))
            .then(async result => {
                if (result.homeworld && result.homeworld.includes('https://swapi.py4e.com/api/planets')) {
                    const planet = await starWars.getPlanetsById(result.homeworld.split('/')[5])
                    result.homeworld = planet.name;
                }
                resultContainer.classList.add('active');
                resultContainerHeader.innerHTML = `${result.title}`;
                resultContainerContent.innerHTML = starWars.stringifyResult(result);
            })
            .catch(e => {
                resultContainer.classList.add('active');
                resultContainerHeader.innerHTML = 'error';
                resultContainerContent.innerHTML = 'unknown error';
            });
    }
}

buttonSearchClose.onclick = function () {
    resultContainer.classList.remove('active');
    fieldSearchByName.value = '';
    fieldSearchById.value = '';
}