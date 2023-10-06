import axios from 'axios';

export const ALL_POKEMON = 'ALL_POKEMON';
export const GET_TYPES = 'GET_TYPES';
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME';
export const GET_DETAILS = 'GET_DETAILS';
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE';
export const FILTER_BY_API_DB = 'FILTER_BY_API_DB';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_ATTACK = 'ORDER_BY_ATTACK';
export const POST_POKEMON = 'POST_POKEMON';

export const allPokemon = () => {
    return async(dispatch) => {
        try{
            const response = await axios.get(`/pokemon`);
            const pokemon = response.data;
            dispatch({
                type: ALL_POKEMON,
                payload: pokemon,
            });
        } catch(error){
            console.log('Could not get all pokemon');
        };
    };
};

export const getTypes = () => {
    return async(dispatch) => {
        try{
            const response = await axios.get(`/types`);
            dispatch({
                type: GET_TYPES, 
                payload: response.data,
            });
        } catch(error){
            console.log('Could not get types');
        };
    };
};

export const searchByName = (name) => {
    return async(dispatch) => {
        try{
            const response = await axios.get(`/pokemon/${name}`);
            dispatch({
                type: SEARCH_BY_NAME,
                payload: response.data,
            });
        } catch(error) {
            console.log('Could not find name');
        };
    };
};

export const getDetails = (id) => {
    return async(dispatch) => {
        try{
            const response = await axios.get(`/pokemon/${id}`);
            dispatch({
                type: GET_DETAILS,
                payload: response.data,
            });
        } catch(error) {
            console.log('Could not get details');
        };
    };

};

export const filterByType = (payload) => {
    return{
        type: FILTER_BY_TYPE,
        payload,
    };
};

export const filterByApiDb = (payload) => {
    return{
        type: FILTER_BY_API_DB,
        payload,
    };
};

export const orderByName = (payload) => {
    return{
        type: ORDER_BY_NAME,
        payload,
    };
};

export const orderByAttack = (payload) => {
    return{
        type: ORDER_BY_ATTACK,
        payload,
    };
};

export const postPokemon = (payload) => {
    return async (dispatch) => {
      try {
        const response = await axios.post(`/pokemon`, payload);
        dispatch({
          type: POST_POKEMON,
          payload: response.data,
        });
        // alert('Pokemon created successfully');
        dispatch(allPokemon());
        return response.data;
      } catch (error) {
        // alert('Failed to create pokemon');
        console.log(error);
      }
    };
};
  