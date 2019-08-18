import React from 'react';
import Room from './Room';
import { Link } from 'react-router-dom';

const RoomsList = (props) => {
    if (props.rooms.length === 0) {
        return (
            <div className="empty-search">
                <h3>There is not room available.</h3>
            </div>
        );
    }
    return (
        <section className="roomslist">
            <div className="roomslist-center">
                {props.rooms.map(room => {
                    return <Room key={room.id} room={room} />;
                })}
            </div>
        </section>
    )
}

export default RoomsList;
