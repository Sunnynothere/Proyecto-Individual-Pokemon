import React from 'react';
import './card.css';

const Card = (pokemon) => {
    
    const { image, name, types } = pokemon;
    
    return(
        <div className='container_card'>
            <div className='card'>
                <div className='card_image'>
                    <img src={image}
                    alt='not found'
                    className='img_img' />
                </div>
                <div className='card_info'>
                    <h5 className='card_name'>{name}</h5>
                    <div className='card_info_type'>
                        {types && types.length > 0 ? (
                            types.map((e) => 
                            <h5 className='types' key={e}>
                                {e}
                            </h5>)
                        ) : (
                            <h5 className='types_error'>
                                No types available
                            </h5>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
};

export default Card;

