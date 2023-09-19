const { Type } = require('../../db');
const axios = require('axios');

const getTypes = async() => {

    const types = await Type.findAll({
        attributes: ['name'],
    });
    
    if(types.length === 0) {
        const apiUrl = await axios.get('https://pokeapi.co/api/v2/type');
        const typesName = apiUrl.data.results.map(t => t.name);
        await Type.bulkCreate(typesName.map((name) => ({name})));
        
        return typesName;
    };
    return types.map(t => t.name);
};

module.exports = {
    getTypes,
};