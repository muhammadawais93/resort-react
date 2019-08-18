import React from 'react';
import { useContext } from 'react';
import { RoomContext } from '../context';

const RoomFilter = () => {
    const context = useContext(RoomContext);
    const {
        handleChange,
        rooms,
        type,
        capacity,
        price,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets
    } = context;

    //getting unique types
    let getUniqueType = [...new Set(rooms.map(room => room.type))];
    getUniqueType = ['all', ...getUniqueType];

    //getting unique capacity
    let getUniqueCapacity = [...new Set(rooms.map(room => room.capacity))];
    return (
        <section className="filter-container">
            <div className="section-title">
                <h4>Search Rooms</h4>
                <div />
            </div>
            <form className="filter-form">
                {/* Type of rooms */}
                <div className="form-group">
                    <label htmlFor="type">Room Type</label>
                    <select 
                        name="type"
                        id="type"
                        value={type}
                        className="form-control"
                        onChange={handleChange}
                    >
                        {getUniqueType.map((item, index) => {
                            return <option value={item} key={index}>{item}</option>
                        })}
                    </select>
                </div>
                {/* Guest */}
                <div className="form-group">
                    <label htmlFor="capacity">Room Capacity</label>
                    <select 
                        name="capacity"
                        id="capacity"
                        value={capacity}
                        className="form-control"
                        onChange={handleChange}
                    >
                        {getUniqueCapacity.map((item, index) => {
                            return <option value={item} key={index}>{item}</option>
                        })}
                    </select>
                </div>
                {/* Range the room */}
                <div className="form-group">
                    <label htmlFor="price">Room Price ${price}</label>
                    <input
                        type="range"
                        name="price"
                        min={minPrice}
                        max={maxPrice}
                        value={price}
                        id="price"
                        className="form-control"
                        onChange={handleChange} />
                </div>
                {/* Size the room */}
                <div className="form-group">
                    <label htmlFor="size">Room Size</label>
                    <div className="size-inputs">
                        <input type="number" id="size" name="minSize" value={minSize} onChange={handleChange} />
                        <input type="number" id="size" name="maxSize" value={maxSize} onChange={handleChange} />
                    </div>
                </div>
                {/* Extras the room */}
                <div className="form-group">
                    <div className="single-extra">
                        <input type="checkbox" id="breakfast" name="breakfast" checked={breakfast} onChange={handleChange}/>
                        <label htmlFor="breakfast">Breakfast</label>
                    </div>
                    <div className="single-extra">
                        <input type="checkbox" id="pets" name="pets" checked={pets} onChange={handleChange}/>
                        <label htmlFor="pets">Pets</label>
                    </div>
                    
                </div>
            </form>
        </section>
    )
}


export default RoomFilter;
