import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CiCircleMore } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { allPokemon, filterByType, orderByName, orderByAttack, getTypes, filterByApiDb } from '../redux/actions';
import Nav from './Nav';
import Card from './Card';
import Paginado from './Paginado';
import './home.css';

const Home = () => {

    const dispatch = useDispatch();
    const pokemon = useSelector((state) => state.pokemon);
    const types = useSelector((state) => state.types);

    // eslint-disable-next-line
    const [order, setOrder] = useState('');

    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line
    const [pokemonPerPage, setPokemonPerPage] = useState(12);

    const indexLast = currentPage * pokemonPerPage;
    const indexFirst = indexLast - pokemonPerPage;
    const currentPokemon = pokemon.slice(indexFirst, indexLast);

    const pagination = function(pageNum) {
        setCurrentPage(pageNum);
    }; 

    useEffect(() => {
        dispatch(allPokemon());
        dispatch(getTypes());
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(allPokemon());
        setCurrentPage(1);
    };

    function handleOrderByName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`);
    };

    function handleOrderByAttack(e) {
        e.preventDefault();
        dispatch(orderByAttack(e.target.value));
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`);
    };

    function handleFilterByType(e) {
        e.preventDefault();
        dispatch(filterByType(e.target.value));
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`);
    };

    function handleFilterCreated(e) {
        dispatch(filterByApiDb(e.target.value));
    };
   
    function toggleSideBar() {
        setSidebarVisible(!sidebarVisible);
    };

    return(
        <div className='container_home'>
            <div className='nav'>
                <Nav />
            </div>

            <div className={`container_filters ${sidebarVisible ? 'responsive_filters' : ''}`}>
                <div className='filters'>
                    <label className='filter'>Order by name</label>
                    <select
                        className='select'
                        onChange={e => handleOrderByName(e)}
                        name='alpha'>
                        <option disabled defaultValue>Alphabetical</option>
                        <option value='a-z'>A-Z</option>
                        <option value='z-a'>Z-A</option>
                    </select>

                    <label className='filter'>Order by attack</label>
                    <select
                        className='select'
                        name='attack'
                        onChange={e => handleOrderByAttack(e)}>
                        <option disabled defaultValue>Attack</option>
                        <option value='min'>min-max</option>
                        <option value='max'>max-min</option>
                    </select>

                    <label className='filter'>Filter by type</label>
                    <select
                        className='select'
                        name='type'
                        onChange={e => handleFilterByType(e)}>
                        <option value=''>All types</option>
                        {types.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>

                    <label className='filter'>Filter api or database</label>
                    <select
                        className='select'
                        name='created'
                        onChange={e => handleFilterCreated(e)}>
                        <option value='all'>Show all</option>
                        <option value='api'>Api</option>
                        <option value='created'>Database</option>
                    </select>

                    <div className='container_button'>
                        <button className='refresh' onClick={handleClick}>
                            Refresh
                        </button>
                    </div>
                </div>
            </div>

            {sidebarVisible && (
                <div className='responsive_sidebar'>
                    <button className='sidebar_open' onClick={toggleSideBar}>
                        <CiCircleMore />
                    </button>
                </div>
            )}

            <div className='cards'>
                {currentPokemon?.map((e) => {
                    return(
                        <div className='card' key={e.id}>
                            <Link to={`/home/${e.id}`}>
                                <Card image={e.image}
                                name={e.name}
                                types={e.type} />
                            </Link>
                        </div>
                    )
                })}
            </div>

            
            <div className='paginado_home'>
                <Paginado pokemonPerPage={pokemonPerPage}
                allPokemon={pokemon.length}
                pagination={pagination}
                currentPokemon={currentPokemon}
                currentPage = {currentPage} />
            </div>
        </div>
    )
};

export default Home;
