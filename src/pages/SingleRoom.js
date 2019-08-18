import React, { Component } from 'react';
import defaultBg from '../images/room-1.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import { RoomContext } from '../context';
import StyleHero from '../components/StyleHero';

class SingleRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slug: this.props.match.params.slug,
            defaultBg
        }
    }
    static contextType = RoomContext;

    render() {
        const { getRoom } = this.context;
        const room = getRoom(this.state.slug);
        if (!room) {
            return (
                <div className="error">
                    <h3>No such room is available.</h3>
                    <Link to="/rooms" className="btn-primary ">Back to Rooms</Link>
                </div>
            )
        }
        return (
            <>
                <StyleHero img={room.images[0]}>
                    <Banner title={`${room.name} room`}>
                        <Link to={'/rooms'} className="btn-primary ">Back to Rooms</Link>
                    </Banner>
                </StyleHero>

                <section className="single-room">
                    <div className="single-room-images">
                        {room.images.slice(1).map((image, index) => {
                            return <img key={index} src={image} alt="Image" />
                        })}
                    </div>
                    <div className="single-room-info">
                        <article className="desc">
                            <h3>Details</h3>
                            <p>{room.description}</p>
                        </article>
                        <article className="info">
                            <h3>Info</h3>
                            <h6>price : {room.price}</h6>
                            <h6>size : {room.size} sft</h6>
                            <h6>Max Capacity : {room.capacity > 1 ? ` ${room.capacity} People` : ` ${room.capacity} Person`}</h6>
                            <h6>{room.pets ? "Pets are allowed" : "No pets allowed"}</h6>
                            <h6>{room.breakfast && "Breakfast Free"}</h6>
                        </article>
                    </div>
                </section>
                <section className="room-extras">
                    <h6>Extras</h6>
                    <ul className="extras">
                        {
                            room.extras.map((extra, index) => {
                                return <li key={index} >- {extra}</li>
                            })
                        }
                    </ul>
                </section>
            </>
        )
    }
}

export default SingleRoom;
