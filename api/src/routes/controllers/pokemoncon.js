const express = require('express');
const { Pokemon, Type } = require('../../db');
const axios = require('axios');

const getApiPokemon = async() => {

    try{
        const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=22');
        
        const dataApi = await Promise.all(
            apiUrl.data.results.map(async(e) => {
                const response = await axios.get(e.url);
                const pokeData = response.data;
                return{
                    id: pokeData.id,
                    name: pokeData.name,
                    image: pokeData.sprites.other["official-artwork"]["front_shiny"],
                    hp: pokeData.stats[0].base_stat,
                    attack: pokeData.stats[1].base_stat,
                    defense: pokeData.stats[2].base_stat,
                    speed: pokeData.stats[5].base_stat,
                    height: pokeData.height,
                    weight: pokeData.weight,
                    type: pokeData.types.map(t => t.type.name),
                };
            })
        );
        return dataApi;
    } catch(error) {
        console.log('Error, could not get pokemon data', error);
        throw error;
    };
};

const getDbInfo = async () => {
    const dbData = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
    });
    const transformedData = dbData.map((pokemon) => {
      const transformedTypes = pokemon.Types.map((type) => type.name);
      return {
        ...pokemon.toJSON(),
        type: transformedTypes,
      };
    });

    return transformedData;
};

const getAllPokemon = async() => {
    const apiData = await getApiPokemon();
    const dbData = await getDbInfo();
    const allData = apiData.concat(dbData);
    return allData;
};

const getByName = async(name) => {
    return await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
};

const getApiById = async(id) => {
    return await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
};

const getDbById = async(id) => {
    const dbData = await Pokemon.findByPk(id, {
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        },
    });
    
    if (dbData) {
        const transformedTypes = dbData.Types.map((type) => type.name);
        transformedData = {
          ...dbData.toJSON(),
          type: transformedTypes,
        };
        return transformedData;
    }
    return dbData;
    
      
};

module.exports = {
    getAllPokemon,
    getApiPokemon,
    getDbInfo,
    getByName,
    getApiById,
    getDbById,
};