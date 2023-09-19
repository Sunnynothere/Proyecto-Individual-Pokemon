
const Validation = (input) => {
    let error = {};

    if(!input.name) {
        error.name = 'Name is required';
    };

    if(input.hp > 255 || !input.hp) {
        error.hp = 'Hp is required';
    }; 

    if(input.attack > 255 || !input.attack) {
        error.attack = 'Attack is required';
    };

    if(input.defense > 255 || !input.defense) {
        error.defense = 'Defense is required';
    };

    if(input.speed > 255 || !input.speed) {
        error.speed = 'Speed is required';
    };

    if(!input.height) {
        error.height = 'Height is required';
    };

    if(!input.weight) {
        error.weight = 'Weight is required';
    };

    return error;
};

export default Validation;