import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getDetails } from '../redux/actions';
import './details.css';

const Details = () => {

    const dispatch = useDispatch();
    const detailsPokemon = useSelector((state) => state.detailsPokemon);
    console.log(detailsPokemon)
    const { id } = useParams();

    useEffect(() => {
        dispatch(getDetails(id));
    }, [dispatch, id]);

    return(
        <div className='container_alldetail'>
            <div className='container_details'>
                {/* eslint-disable-next-line */}
                <div className='img_detail'>
                    <img src={detailsPokemon?.image} alt='not found' className='image_detail'/>
                </div>

                <div className='detail_info'>

                    <h1 className='detail_title'>{detailsPokemon.name}</h1>
                    
                    <div className='info'>
                        <h3>Types: {detailsPokemon.type ? detailsPokemon.type.join(', ') : ''}</h3>
                    </div>


                    <div className='info'>
                        <h3>HP: {detailsPokemon.hp}</h3>
                        <h3>Attack: {detailsPokemon.attack}</h3>
                        <h3>Defense: {detailsPokemon.defense}</h3>
                        <h3>Speed: {detailsPokemon.speed ? detailsPokemon.speed : 'Does not have speed'}</h3>
                        <h3>Height: {detailsPokemon.height ? detailsPokemon.height : 'Does not have height'}</h3>
                        <h3>Weight: {detailsPokemon.weight ? detailsPokemon.weight : 'Does not have weight'}</h3>
                    </div>

                    <Link to='/home'>
                        <button className='back_button'>
                            Back home
                        </button>
                    </Link>
                    
                </div>    
            </div>
        </div>
    )
};

export default Details;