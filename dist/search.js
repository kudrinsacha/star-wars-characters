"use strict";
const searchByNameInput = document.getElementById('byQueryInput');
const searchByNameBtn = document.getElementById('byQueryBtn');
const spinnerLoading = document.querySelector('.spinner');
const resultContainer = document.getElementById('result-container');
const resultContainerHeader = document.querySelector('.message-header > p');
const resultContainerContent = document.getElementById('content');
const resultContainerCloseBtn = document.getElementById('result-container-close');
const optionSearchByName = document.getElementById('resource-select');
const searchByIdInput = document.getElementById('byIdInput');
const searchByIdBtn = document.getElementById('byIdBtn');
const optionSearchById = document.getElementById('resource-id-select');
function handleSearchByName() {
    resultContainer.style.cssText += 'visibility: hidden';
    if (!searchByNameInput.value) {
        resultContainerHeader.textContent = 'Error';
        resultContainer.style.cssText += 'visibility: initial';
        resultContainerContent.textContent = 'Please, write value';
    }
    else {
        let func;
        spinnerLoading.style.cssText += 'visibility: initial';
        switch (optionSearchByName.value) {
            case 'people':
                func = 'searchCharacters';
                break;
            case 'planets':
                func = 'searchPlanets';
                break;
            case 'species':
                func = 'searchSpecies';
                break;
            default:
                func = 'searchCharacters';
                break;
        }
        starWars[func](searchByNameInput.value)
            .then(async (data) => {
            spinnerLoading.style.cssText += 'visibility: hidden';
            resultContainer.style.cssText += 'visibility: initial';
            if (JSON.stringify(data.results) === '[]') {
                resultContainerHeader.textContent = 'Error';
                resultContainerContent.textContent = 'Not Found';
            }
            else {
                const keys = Object.keys(data.results[0]);
                const values = Object.values(data.results[0]);
                resultContainerHeader.textContent = `${data.results[0].name}`;
                resultContainerContent.textContent = '';
                await starWars.replaceResult(keys, values, data.results[0].homeworld);
            }
        });
    }
}
function handleSearchById() {
    resultContainer.style.cssText += 'visibility: hidden';
    if (!searchByIdInput.value) {
        resultContainerHeader.textContent = 'Error';
        resultContainer.style.cssText += 'visibility: initial';
        resultContainerContent.textContent = 'Please, write value';
    }
    else {
        let func;
        spinnerLoading.style.cssText += 'visibility: initial';
        switch (optionSearchById.value) {
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
            default:
                func = 'searchCharacters';
                break;
        }
        starWars[func](searchByIdInput.value)
            .then(async (data) => {
            console.log(data);
            spinnerLoading.style.cssText += 'visibility: hidden';
            resultContainer.style.cssText += 'visibility: initial';
            if (data.detail) {
                resultContainerHeader.textContent = 'Error';
                resultContainerContent.textContent = `${data.detail}`;
            }
            else {
                const keys = Object.keys(data);
                const values = Object.values(data);
                if (data.name) {
                    resultContainerHeader.textContent = `${data.name}`;
                }
                if (data.title) {
                    resultContainerHeader.textContent = `${data.title}`;
                }
                resultContainerContent.textContent = '';
                await starWars.replaceResult(keys, values, data.homeworld);
            }
        });
    }
}
function handleResultContainerClose() {
    resultContainer.style.cssText += 'visibility: hidden';
    searchByNameInput.value = '';
    searchByIdInput.value = '';
}
searchByNameBtn.addEventListener('click', handleSearchByName);
searchByIdBtn.addEventListener('click', handleSearchById);
resultContainerCloseBtn.addEventListener('click', handleResultContainerClose);
