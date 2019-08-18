import React, { Component } from 'react';
import items from './data';
import Client from './Contentful';
import { async } from 'q';

const RoomContext = React.createContext();

class RoomPrivider extends Component {
    constructor(props) {
        super(props);
        //this.handleChange = this.handleChange.bind(this);
    }
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    };

    getData = async () => {
        try {
            let response = await Client.getEntries({
                content_type: 'beachResortRooms'
            });
            let rooms = this.formatData(response.items);
            let featuredRooms = rooms.filter(room => room.featured === true);
            let maxPrice = Math.max(...rooms.map(room => room.price));
            let maxSize = Math.max(...rooms.map(room => room.size));
            this.setState({
                rooms: rooms,
                sortedRooms: rooms,
                featuredRooms: featuredRooms,
                loading: false,
                price: maxPrice,
                maxPrice: maxPrice,
                maxSize: maxSize
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    componentDidMount() {
        this.getData();
    }

    formatData(items) {
        let tempalate = items.map(item => {
            let images = item.fields.images.map(image => image.fields.file.url);
            let id = item.sys.id;

            let room = { ...item.fields, images, id };
            return room;
        });
        return tempalate;
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug);
        return room;
    }

    handleChange = event => {
        const target = event.target;
        const value = target.value === "checkbox" ? target.checked : target.value;
        const name = event.target.name;
        this.setState({[name]: value}, this.filterRoom);
    }

    filterRoom = () => {
        let {
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
        } = this.state;

        let filterRooms = [...rooms];
        if (type !== "all") {
            filterRooms = filterRooms.filter(room => room.type === type);
        }
        capacity = parseInt(capacity);
        if (capacity !== 1) {
            filterRooms = filterRooms.filter(room => room.capacity >= capacity);
        }

        price = parseInt(price);
        filterRooms = filterRooms.filter(room => room.price <= price);

        filterRooms = filterRooms.filter(
            room => room.size >= minSize && room.size <= maxSize
        );

         //filter by breakfast
        if (breakfast) {
            filterRooms = filterRooms.filter(room => room.breakfast === true);
        }
        //filter by pets
        if (pets) {
            filterRooms = filterRooms.filter(room => room.pets === true);
        }
            this.setState({ sortedRooms: filterRooms });
        }

    render() {
        return (
            <RoomContext.Provider value={{...this.state, getRoom: this.getRoom, handleChange: this.handleChange}}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export {RoomContext, RoomPrivider, RoomConsumer};
