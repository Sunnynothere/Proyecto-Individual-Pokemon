const { Router } = require('express');

const axios = require('axios');
const { getAllPokemon, getApiById, getDbById, getByName, getApiPokemon } = require('./controllers/pokemoncon');
const { Pokemon, Type } = require('../db');
const router = Router();

router.get('/', async (req, res) => {
    try {
      const { name } = req.query;
  
      if (name) {
        try {
          const response = await getByName(name);
          const pokemon = response.data;
  
          const pokemonData = {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.other['official-artwork']['front_default'],
            hp: pokemon.stats[0].base_stat,
            attack: pokemon.stats[1].base_stat,
            defense: pokemon.stats[2].base_stat,
            speed: pokemon.stats[5].base_stat,
            height: pokemon.height,
            weight: pokemon.weight,
            type: pokemon.types.map((type) => type.type.name),
          };
  
          return res.status(200).send(pokemonData);
        } catch (error) {
          return res.status(404).send('Pokemon not found');
        }
      } else {
        try {
            const pokeData = await getAllPokemon();
        
            if (pokeData.length) {
              return res.status(200).send(pokeData);
            } else {
              return res.status(404).send('No pokemon data found');
            }
          } catch (error) {
            console.log(error);
            return res.status(500).send('Failed to fetch pokemon data');
          }
        }
    } catch (error) {
      return res.status(500).send('Error retrieving Pokemon data');
    }
});

router.get('/:id', async(req, res) => {
  const { id } = req.params;

  try{
      if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)) {
          let dbPokeById = await getDbById(id);
          return res.status(200).send(dbPokeById);
      } else{
          apiPokeById = await getApiById(id);
          if(apiPokeById.data.id) {
              let detailsPokemon = {
                  id: apiPokeById.data.id,
                  name: apiPokeById.data.name,
                  image: apiPokeById.data.sprites.other["official-artwork"]["front_shiny"],
                  hp: apiPokeById.data.stats[0].base_stat,
                  attack: apiPokeById.data.stats[1].base_stat,
                  defense: apiPokeById.data.stats[2].base_stat,
                  speed: apiPokeById.data.stats[5].base_stat,
                  height: apiPokeById.data.height,
                  weight: apiPokeById.data.weight,
                  type: apiPokeById.data.types.map(t => t.type.name),
              };
              return res.status(200).send(detailsPokemon);
          };
      };
  } catch(error) {
      return res.status(200).send('Pokemon not found by id');
  };
});

router.post('/', async(req, res) => {
    const { name, image, hp, attack, defense, speed, height, weight, type, createdDb } = req.body;

    try{
      let newPokemon = await Pokemon.create({
        name,
        image,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        createdDb,
      });

      let dbType = await Type.findAll({
        where: {
          name: type,
        },
      });

      newPokemon.addType(dbType);
      // res.send('Pokemon created successfully');
      newPokemon = await Pokemon.findByPk(newPokemon.id, {
        include: Type,
      });
  
      res.status(201).json(newPokemon);

    } catch(error){
        return res.status(500).send('Could not create form');
    }
});
  

module.exports = router;
