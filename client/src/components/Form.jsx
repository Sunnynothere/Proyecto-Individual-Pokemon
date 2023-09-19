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
        setInput({
            ...input,
            type: [...input.type, e.target.value],
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postPokemon(input));
        alert('Pokemon created');
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
    };

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
                            <label>Hp</label>
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
                        <select onChange={(e) => handleSelect(e)}>
                            {types.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='selected'>
                        <ul>
                            <li>{input.type.map(type => (type + ' '))}</li>
                        </ul>
                    </div>

                    <button className='submit_form' type='submit'>
                        Create pokemon
                    </button>
                </form>
                <div className='back_home'>
                    <Link to='/home'>
                        <button>Back home</button>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default Form;