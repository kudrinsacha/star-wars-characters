/// <reference path="namespaces.ts" />

namespace serverDTO {
    const searchByNameInput = <HTMLInputElement>document.getElementById('byQueryInput')!;
    const searchByNameBtn = document.getElementById('byQueryBtn')!;
    const spinnerLoading = document.querySelector<HTMLElement>('.spinner')!;
    const resultContainer = document.getElementById('result-container')!;
    const resultContainerHeader = document.querySelector('.message-header > p')!;
    const resultContainerContent = document.getElementById('content')!;
    const resultContainerCloseBtn = document.getElementById('result-container-close')!;
    const optionSearchByName = <HTMLOptionElement>document.getElementById('resource-select')!;
    const searchByIdInput = <HTMLInputElement>document.getElementById('byIdInput')!;
    const searchByIdBtn = document.getElementById('byIdBtn')!;
    const optionSearchById = <HTMLOptionElement>document.getElementById('resource-id-select')!;

    function handleSearchByName() {
        resultContainer.style.cssText += 'visibility: hidden';
        if (!searchByNameInput.value) {
            resultContainerHeader.textContent = 'Error';
            resultContainer.style.cssText += 'visibility: initial';
            resultContainerContent.textContent = 'Please, write value';
        } else {
            let func: 'searchCharacters' | 'searchPlanets' | 'searchSpecies';
            spinnerLoading.style.cssText += 'visibility: initial'
            switch (optionSearchByName.value) {
                case 'people':
                    func = 'searchCharacters'
                    break;
                case 'planets':
                    func = 'searchPlanets'
                    break;
                case 'species':
                    func = 'searchSpecies'
                    break;
                default:
                    func = 'searchCharacters'
                    break;
            }
            starWars[func](searchByNameInput.value)
                .then((data) => {
                    spinnerLoading.style.cssText += 'visibility: hidden';
                    resultContainer.style.cssText += 'visibility: initial';
                    if (JSON.stringify(data.results) === '[]') {
                        resultContainerHeader.textContent = 'Error';
                        resultContainerContent.textContent = 'Not Found';
                    } else {
                        const keys = Object.keys(data.results[0])
                        const values = Object.values(data.results[0])

                        resultContainerHeader.textContent = `${data.results[0].name}`;
                        resultContainerContent.textContent = '';

                        if (func === 'searchCharacters' || func === 'searchSpecies') {
                            const currentData = data as (CharacterSearchByName | SpeciesSearchByName)
                            starWars.replaceResult(keys, values, resultContainerContent, currentData.results[0].homeworld);
                        } else {
                            starWars.replaceResult(keys, values, resultContainerContent);
                        }
                    }
                })
        }
    }

    function handleSearchById() {
        resultContainer.style.cssText += 'visibility: hidden';
        if (!searchByIdInput.value) {
            resultContainerHeader.textContent = 'Error';
            resultContainer.style.cssText += 'visibility: initial';
            resultContainerContent.textContent = 'Please, write value';
        } else {
            let func: 'getCharactersById' | 'getPlanetsById' | 'getSpeciesById' | 'getFilmsById';
            spinnerLoading.style.cssText += 'visibility: initial'
            switch (optionSearchById.value) {
                case 'people':
                    func = 'getCharactersById'
                    break;
                case 'planets':
                    func = 'getPlanetsById'
                    break;
                case 'species':
                    func = 'getSpeciesById'
                    break;
                case 'films':
                    func = 'getFilmsById'
                    break;
                default:
                    func = 'getCharactersById'
                    break;
            }
            starWars[func](+searchByIdInput.value)
                .then((data) => {
                    spinnerLoading.style.cssText += 'visibility: hidden';
                    resultContainer.style.cssText += 'visibility: initial';
                    const keys = Object.keys(data)
                    const values = Object.values(data)
                    let name;

                    if (func === 'getFilmsById') {
                        const currentData = data as FilmsSearchById;
                        name = currentData.title;
                    } else {
                        const currentData = data as CharacterSearchById | PlanetSearchById | SpeciesSearchById;
                        name = currentData.name;
                    }

                    resultContainerHeader.textContent = `${name}`;

                    resultContainerContent.textContent = '';

                    if (data.error) {
                        resultContainerContent.textContent = `${data.error}`;
                    } else {
                        if (func === 'getPlanetsById' || func === 'getFilmsById') {
                            starWars.replaceResult(keys, values, resultContainerContent);
                        } else {
                            const currentData = data as (CharacterSearchById | SpeciesSearchById);
                            starWars.replaceResult(keys, values, resultContainerContent, currentData.homeworld);
                        }
                    }
                })
        }
    }

    function handleResultContainerClose() {
        resultContainer.style.cssText += 'visibility: hidden';
        searchByNameInput.value = '';
        searchByIdInput.value = '';
    }

    searchByNameBtn.addEventListener('click', handleSearchByName);
    searchByIdBtn.addEventListener('click', handleSearchById)
    resultContainerCloseBtn.addEventListener('click', handleResultContainerClose);
}