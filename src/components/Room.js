import React from 'react';
import { Link } from 'react-router-dom';
import PropsTypes from 'prop-types';

const Room = (props) => {
    const { name, slug, images, price } = props.room;
    return (
        <article className="room">
            <div className="img-container">
                <img src={images[0]} alt="signle room" />
                <div className="price-top">
                    <h6>{price}</h6>
                    <p>Per Night</p>
                </div>
                <Link to={`/rooms/${slug}`} className="btn-primary room-link" >Features</Link>
            </div>
            <p className="room-info" >{name}</p>
        </article>
    )
}

Room.propsTypes = {
    room:PropsTypes.shape({
        name: PropsTypes.string.isRequired,
        slug: PropsTypes.string.isRequired,
        images: PropsTypes.arrayOf(PropsTypes.string).isRequired,
        price: PropsTypes.number.isRequired
    })
}

export default Room;
