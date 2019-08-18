import React, { Component } from 'react';
import { RoomContext } from '../context';
import Room from './Room';
import Loading from './Loading';

export default class FeatureRooms extends Component {
    static contextType = RoomContext;
    render() {
        let { loading, featuredRooms: rooms } = this.context;
        return (
            <section className="featured-rooms">
                <div className="section-title">
                    <h4>Feature Rooms</h4>
                    <div />
                </div>
                <div className="featured-rooms-center">
                    {loading ?
                        <Loading /> :
                        rooms.map(room => {
                            return <Room key={room.id} room={room} />;
                        })
                    }
                </div>
            </section>
        )
    }
}
