import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
        alert('Pokemon created succesfully');
        dispatch(postPokemon(input))
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
    }      
    
    return(
        <div className='container_form'>

            <div className='forms'>
                <h1 className='title_form'>Create your pokemon:</h1>
                <form class='form' onSubmit={(e) => handleSubmit(e)}>

                <div className='info_form'>
                    <label>Name</label>
                    <input 
                    type='text' name='name'
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
                    pattern='^https?://.+(jpg|jpeg|png|gif)$'
                    onChange={handleChange} />
                </div>

                <div className='info_form column'>
                    <div className='info_form'>
                        <div className='container_input'>
                            <label>HP</label>
                            <input type='number' name='hp'
                            value={input.hp}
                            onChange={handleChange} />
                        </div>
                        {error.hp && (<p className='error'>{error.hp}</p>)}
                    </div>

                    <div className='info_form'>
                        <div className='container_input'>
                            <label>Attack</label>
                            <input type='number' name='attack'
                            value={input.attack}
                            onChange={handleChange} />
                        </div>
                        {error.attack && (<p className='error'>{error.attack}</p>)}
                    </div>

                    <div className='info_form'>
                        <div className='container_input'>
                            <label>Defense</label>
                            <input type='number' name='defense'
                            value={input.defense}
                            onChange={handleChange} />
                        </div>
                        {error.defense && (<p className='error'>{error.defense}</p>)}
                    </div>

                    <div className='info_form'>
                        <div className='container_input'>
                            <label>Speed</label>
                            <input type='number' name='speed'
                            value={input.speed}
                            onChange={handleChange} />
                        </div>
                        {error.speed && (<p className='error'>{error.speed}</p>)}
                    </div>
                </div>

                <div className='info_form column'>
                    <div className='info_form'>
                        <div className='container_input'>
                            <label>Height</label>
                            <input type='number' name='height'
                            value={input.height}
                            onChange={handleChange} />
                        </div>
                        {error.height && (<p className='error'>{error.height}</p>)}
                    </div>

                    <div className='info_form'>
                        <div className='container_input'>
                            <label>Weight</label>
                            <input type='number' name='weight'
                            value={input.weight}
                            onChange={handleChange} />
                        </div>
                        {error.weight && (<p className='error'>{error.weight}</p>)}
                    </div>

                    <div className='info_form'>
                        <div className='container_input'>
                            <label>Types</label>
                            <select onChange={(e) => handleSelect(e)} className='select'>
                                {types.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                 <div className='selected'>
                    
                        {input.type.map((type) => (
                            <p className='selected type'>
                                {type}
                            </p>
                        ))}
                    
                </div>

                <div className='button_container'>
                    <button className='button_form' type='submit'>
                        Create pokemon
                    </button>

                    <button type='button' onClick={handleClearType} className='button_form clear'>Clear</button>
                </div>
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