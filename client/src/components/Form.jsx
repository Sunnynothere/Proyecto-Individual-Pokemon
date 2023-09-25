import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { postPokemon, getTypes } from '../redux/actions';
import Validation from './Validation';
import './form.css';

const Form = () => {

    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);
    const [error, setError] = useState({});

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    const[input, setInput] = useState({
        name: '',
        image: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        type: [],
    });

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value,
        });
        setError(Validation({
            ...input,
            [e.target.name]: e.target.value,
        }));
    };

    function handleSelect(e) {
        const selectedType = e.target.value;

        if (!input.type.includes(selectedType)) {
            setInput({
                ...input,
                type: [...input.type, selectedType],
            });
        }
    };

    function handleClearType() {
        setInput({
            ...input,
            type: [],
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postPokemon(input))
            .then((response) => {
                if(response && response.status === 201) {
                    Swal.fire({
                        title: 'Pokemon created successfully!',
                        background: 'white',
                        width: '20%',
                    });
                } else{
                    Swal.fire({
                        title: 'Missing data!',
                        background: 'white',
                        width: '20%',
                        icon: 'warning',
                    });
                };
            })
            .then(() => {
                setInput({
                    name: '',
                    image: '',
                    hp: '',
                    attack: '',
                    defense: '',
                    speed: '',
                    height: '',
                    weight: '',
                    type: [],
                });
            })
        .catch((error) => {
            console.error('Error al crear el Pokémon:', error);
            Swal.fire({
                title: 'Failed to create Pokemon!',
                background: 'white',
                width: '20%',
                icon: 'error',
            });
        });
    } 

    return(
        <div className='container_form'>

            <div className='forms'>
                <h1 className='form_title'>Create your pokemon:</h1>
                <form className='form' onSubmit={(e) => handleSubmit(e)}>

                    <div className='info_form'>
                        <label>Name</label>
                        <input type='text' name='name'
                        value={input.name}
                        onChange={handleChange} />
                    </div>
                    {error.name && (<p className='error'>{error.name}</p>)}

                    <div className='info_form'>
                        <label>Image</label>
                        <input name='image' alt='img not found'
                        value={input.image}
                        title='url format'
                        placeholder='image url'
                        pattern='https?:\/\/[\w\-]+(\.[\w\-]+)*[/#?]?.*$'
                        onChange={handleChange} />
                    </div>

                    <div className='info_form column'>
                        <div className='info_form'>
                            <label>HP</label>
                            <input type='number' name='hp'
                            value={input.hp}
                            onChange={handleChange} />
                        </div>
                        {error.hp && (<p className='error'>{error.hp}</p>)}

                        <div className='info_form'>
                            <label>Attack</label>
                            <input type='number' name='attack'
                            value={input.attack}
                            onChange={handleChange} />
                        </div>
                        {error.attack && (<p className='error'>{error.attack}</p>)}

                        <div className='info_form'>
                            <label>Defense</label>
                            <input type='number' name='defense'
                            value={input.defense}
                            onChange={handleChange} />
                        </div>
                        {error.defense && (<p className='error'>{error.defense}</p>)}

                        <div className='info_form'>
                            <label>Speed</label>
                            <input type='number' name='speed'
                            value={input.speed}
                            onChange={handleChange} />
                        </div>
                        {error.speed && (<p className='error'>{error.speed}</p>)}
                    </div>

                    <div className='info_form column'>
                        <div className='info_form'>
                            <label>Height</label>
                            <input type='number' name='height'
                            value={input.height}
                            onChange={handleChange} />
                        </div>
                        {error.height && (<p className='error'>{error.height}</p>)}

                        <div className='info_form'>
                            <label>Weight</label>
                            <input type='number' name='weight'
                            value={input.weight}
                            onChange={handleChange} />
                        </div>
                        {error.weight && (<p className='error'>{error.weight}</p>)}
                    </div>

                    <div className='info_form'>
                        <label>Types</label>
                        <select onChange={(e) => handleSelect(e)} className='select'>
                            {types.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                        <button type='button' onClick={handleClearType} className='button_form clear'>Clear</button>
                    </div>
                    <div className='selected'>
                        
                            {input.type.map((type) => (
                                <p className='selected type'>
                                    {type}
                                </p>
                            ))}
                        
                    </div>

                    <button className='button_form' type='submit'>
                        Create pokemon
                    </button>
                </form>
                <div className='back_home'>
                    <Link to='/home'>
                        <button className='button_form'>Back home</button>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default Form;