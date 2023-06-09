import React from "react";
import '../estilos/sass/card.scss';
import { Link } from 'react-router-dom';

export default function Card({ name, background_image, rating, genres, id})  {

    let genre = genres.join(', ');
    

    return (
        <Link to={`/videogame/${id}`} className="card"> 
            <div className="cardImage">
                <img src={background_image} alt={name} className='image' />
            </div>
            <h3>{name}</h3>
            <h5>Rating: {rating}</h5>
            <h5>Genre: {genre}</h5>
        </Link>
    );
};