import {
    ALL_POKEMON,
    GET_TYPES,
    SEARCH_BY_NAME,
    GET_DETAILS,
    FILTER_BY_TYPE,
    FILTER_BY_API_DB,
    ORDER_BY_NAME,
    ORDER_BY_ATTACK,
    POST_POKEMON,
} from './actions';

const initialState = {
    pokemon: [],
    allPokemon: [],
    types: [],
    detailsPokemon: [],
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {

        case ALL_POKEMON: {
            const { payload } = action;
            return{
                ...state,
                allPokemon: payload,
                pokemon: payload,
            };
        }

        case GET_TYPES: {
            const { payload } = action;
            return {
                ...state,
                types: payload,
            };
        }               

        case SEARCH_BY_NAME: {
            const { payload } = action;
            console.log(payload)
            return{
                ...state,
                pokemon: Array.isArray(payload) ? payload : [payload],
            };
        }

        case GET_DETAILS: {
            const { payload } = action;
            return{
                ...state,
                detailsPokemon: payload,
            };
        }

        case FILTER_BY_TYPE: {
            const { payload } = action;
            const allPokemon = state.allPokemon;
            const filteredPokemon = payload === ''
              ? allPokemon
              : allPokemon.filter((pokemon) =>
                  pokemon.type && pokemon.type.includes(payload.toLowerCase())
                );
          
            return {
              ...state,
              pokemon: filteredPokemon,
            };
        }            
        
        case FILTER_BY_API_DB: {
            const { payload } = action;
            const pokemonCreated = payload === 'created' ?
            state.allPokemon.filter(e => e.createdDb) :
            state.allPokemon.filter(e => !e.createdDb);
            return {
                ...state,
                pokemon: payload === 'all' ? 
                state.allPokemon : pokemonCreated
            };
        }
      
        case ORDER_BY_NAME: {
            const { payload } = action;
            let sortedPokemon = [...state.pokemon];
            sortedPokemon = payload === 'a-z' ?
            state.pokemon.sort(function(a, b) {
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 0;
            }) :
            state.pokemon.sort(function(a, b) {
                if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                return 0
            });
            return{
                ...state,
                pokemon: sortedPokemon,
            };
        }

        case ORDER_BY_ATTACK: {
            const { payload } = action;
            let sortedAttack = [...state.pokemon];
            sortedAttack = payload === 'min' ?
            state.pokemon.sort(function(a, b) {
                if(a.attack > b.attack) return 1;
                if(a.attack < b.attack) return -1;
                return 0;
            }) :
            state.pokemon.sort(function(a, b) {
                if(a.attack < b.attack) return 1;
                if(a.attack > b.attack) return -1;
                return 0;
            });
            return{
                ...state,
                pokemon: sortedAttack,
            };
        }

        case POST_POKEMON: {
            const { payload } = action;
            return{
                ...state,
                pokemon: [...state.pokemon, payload],
                allPokemon: [...state.allPokemon, payload],
            };
        }

        default:
            return state;
    };
};

export default rootReducer;