const searchByNameInput = <HTMLInputElement>document.getElementById('byQueryInput')!;
const searchByNameBtn = document.getElementById('byQueryBtn')!;
const spinnerLoading = document.querySelector<HTMLElement>('.spinner')!;
const resultContainer = document.getElementById('result-container')!;
const resultContainerHeader = document.querySelector('.message-header > p')!;
const resultContainerContent = document.getElementById('content')!;
const resultContainerCloseBtn = document.getElementById('result-container-close')!;
const optionSearchByName = document.getElementById('resource-select')!;

function handleSearchByName() {
    if (!searchByNameInput.value) {
        resultContainerHeader.textContent = 'Error';
        resultContainer.style.cssText += 'visibility: initial';
        resultContainerContent.textContent = 'Please, write value';
    } else {
        spinnerLoading.style.cssText += 'visibility: initial'
        starWars.searchCharacters(searchByNameInput.value)
            .then(async (data) => {
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

                    for (let i = keys.length - 1; i >= 0; i--) {
                        if ((keys[i] === 'films' && JSON.stringify(values[i]) !== '[]') || (keys[i] === 'species' && JSON.stringify(values[i]) !== '[]') || (keys[i] === 'vehicles' && JSON.stringify(values[i]) !== '[]') || (keys[i] === 'starships' && JSON.stringify(values[i]) !== '[]')) {
                            const valuesChanged = values[i].join(',').replace(/,/g, '<br/>    ');
                            resultContainerContent.insertAdjacentHTML('afterbegin',
                                `<p>${keys[i]}:<br/>    ${valuesChanged}</p>`
                            );
                        } else if (keys[i] === 'homeworld' && values[i]) {
                            const homeWorld = await starWars.searchPlanets(data.results[0].homeworld) as {
                                name: string
                            }
                            resultContainerContent.insertAdjacentHTML('afterbegin',
                                `<p>${keys[i]}: ${homeWorld.name}</p>`
                            );
                        } else {
                            resultContainerContent.insertAdjacentHTML('afterbegin',
                                `<p>${keys[i]}: ${values[i]}</p>`
                            );
                        }
                    }
                }
            })
    }
}

function handleResultContainerClose() {
    resultContainer.style.cssText += 'visibility: hidden';
    searchByNameInput.value = '';
}

searchByNameBtn.addEventListener('click', handleSearchByName);
resultContainerCloseBtn.addEventListener('click', handleResultContainerClose);