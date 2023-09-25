import React from 'react';
import './paginado.css';

const Paginado = ({allPokemon, pokemonPerPage, pagination, currentPage}) => {

    const pageNum = [];

    for(let i = 1; i <= Math.ceil(allPokemon/pokemonPerPage); i++){
        pageNum.push(i);
    };

    return(
        <div>
            <nav className='container_paginado'>
                <ul className='list'>
                    {pageNum?.map((pageNum) => (
                        <li className='page' key={pageNum}>
                            <button onClick={() => pagination(pageNum)} className='numbers'>
                                {pageNum}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
};

export default Paginado;