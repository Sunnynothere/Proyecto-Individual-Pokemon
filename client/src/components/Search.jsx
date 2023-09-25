import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchByName } from '../redux/actions';
import './nav.css';

const Search = () => {

    const dispatch = useDispatch();
    const [input, setInput] = useState('');

    function handleChange(e){
        e.preventDefault();
        setInput(e.target.value);
    };

    function handleSubmit(e){
        try{
            console.log('Search term:', input);
            dispatch(searchByName(input));
        } catch(error){
            return error;
        };
        setInput('');
    };

    return(
        <div className='container_search'>
            <input className='search_input'
            type='text'
            value={input} placeholder='Search Pokemon'
            onChange={e => handleChange(e)} />

            <div className='search_button'>
                <button type='submit' onClick={e => handleSubmit(e)} className='s_button'>
                    Search
                </button>
            </div>
        </div>
    )
};

export default Search;

