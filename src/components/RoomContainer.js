import React, { Component } from 'react';
import RoomFilter from './RoomFilter';
import RoomList from './RoomsList';
import { RoomConsumer } from '../context';
import Loading from './Loading';

/* https://reactjs.org/docs/context.html#contextconsumer */
class RoomContainer extends Component {
    render() {
        return (
            <RoomConsumer>
                {value => {
                    const { loading, sortedRooms, rooms } = value
                    if (loading) return <Loading />;
                    return (
                        <div>
                            <RoomFilter rooms={rooms} />
                            <RoomList rooms={sortedRooms} />
                        </div>
                    );
                }}
            </RoomConsumer>
        )
    }
}

export default RoomContainer;
