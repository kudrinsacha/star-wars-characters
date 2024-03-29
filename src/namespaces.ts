namespace serverDTO {
    interface ResSearchByNameDTO<optionDTO> {
        count?: number;
        next?: unknown;
        previous?: unknown;
        results: [optionDTO];
    }

    interface BaseDTO {
        name: string;
        films: string[] | [];
        created: string;
        edited: string;
        url: string;
    }

    interface CharacterDTO extends BaseDTO{
        height: string;
        mass: string;
        hair_color: string;
        skin_color: string;
        eye_color: string;
        birth_year: string;
        gender: string;
        homeworld: string;
        species: string[] | [];
        vehicles: string[] | [];
        starships: string[] | [];
    }

    interface PlanetDTO extends BaseDTO{
        rotation_period: string;
        orbital_period: string;
        diameter: string;
        climate: string;
        gravity: string;
        terrain: string;
        surface_water: string;
        population: string;
        residents: string[] | [];
        starships: string[] | [];
    }

    interface SpeciesDTO extends BaseDTO{
        classification: string;
        designation: string;
        average_height: string;
        skin_colors: string;
        hair_colors: string;
        eye_colors: string;
        average_lifespan: string;
        homeworld: string;
        language: string;
        people: string[] | [];
    }

    type FilmsDTO = Omit<BaseDTO, 'name' | 'films'> & {
        title: string;
        episode_id: number;
        opening_crawl: string;
        director: string;
        producer: string;
        release_date: string;
        characters: string[] | [];
        planets: string[] | [];
        starships: string[] | [];
        vehicles: string[] | [];
        species: string[] | [];
    }

    interface Error {
        name: string;
        error: string;
    }

    export type CharacterSearchByName = ResSearchByNameDTO<CharacterDTO>
    export type PlanetSearchByName = ResSearchByNameDTO<PlanetDTO>
    export type FoundPlanet = PlanetDTO;
    export type SpeciesSearchByName = ResSearchByNameDTO<SpeciesDTO>

    export type CharacterSearchById = CharacterDTO | Error;
    export type PlanetSearchById = PlanetDTO | Error;
    export type SpeciesSearchById = SpeciesDTO | Error;
    export type FilmsSearchById = FilmsDTO | Error;
    export interface StarWarsAPI{
        searchCharacters(query: string): Promise<CharacterSearchByName>;
        searchPlanets(query: string): Promise<PlanetSearchByName>;
        searchPlanet(query: string | undefined): Promise<FoundPlanet>;
        searchSpecies(query: string): Promise<SpeciesSearchByName>;
        getCharactersById(id: number): Promise<CharacterSearchById>;
        getPlanetsById(id: number): Promise<PlanetSearchById>;
        getSpeciesById(id: number): Promise<SpeciesSearchById>;
        getFilmsById(id: number): Promise<FilmsSearchById>;
        replaceResult(keys: string[], values: (string | [])[], resultContainerContent: HTMLElement, homeworld?: string): void;
    }
}