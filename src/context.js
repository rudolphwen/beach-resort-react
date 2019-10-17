import React, { useState, useEffect } from 'react';
// import items from './data';
import Client from './Contentful';

// Client.getEntries({
//     content_type: 'beachResortRoom'
//     })
//     .then((response) => console.log(response.items))
//     .catch(console.error);

const RoomContext = React.createContext();

const RoomProvider = (props) => {
    const [rooms, setRooms] = useState([]);
    const [sortedRooms, setSortedRooms] = useState([]);
    const [featuredRooms, setFeaturedRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState('all');
    const [capacity, setCapacity] = useState(1);
    const [price, setPrice] = useState(0);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [minSize, setMinSize] = useState(0);
    const [maxSize, setMaxSize] = useState(1000);
    const [breakfast, setBreakfast] = useState(false);
    const [pets, setPets] = useState(false);

    // getData()
    const getData = async () => {
        try {
            let response = await Client.getEntries({
                content_type: 'beachResortRoom',
                // order: 'sys.createdAt'
                order: 'fields.price'
            });
            let rooms = formatData(response.items);
            let featuredRooms = rooms.filter(room => room.featured === true);
            let maxPrice = Math.max(...rooms.map(item => item.price));
            let maxSize = Math.max(...rooms.map(item => item.size));
            setRooms(rooms);
            setFeaturedRooms(featuredRooms);
            setSortedRooms(rooms);
            setLoading(false);
            setPrice(maxPrice);
            setMaxPrice(maxPrice);
            setMaxSize(maxSize);
        } catch (error) {
            console.log('[context.js]', error);
        }
    };

    // useEffect(() => {
    //     let rooms = formatData(items);
    //     let featuredRooms = rooms.filter(room => room.featured === true);
    //     let maxPrice = Math.max(...rooms.map(item => item.price));
    //     let maxSize = Math.max(...rooms.map(item => item.size));
    //     setRooms(rooms);
    //     setFeaturedRooms(featuredRooms);
    //     setSortedRooms(rooms);
    //     setLoading(false);
    //     setPrice(maxPrice);
    //     setMaxPrice(maxPrice);
    //     setMaxSize(maxSize);
    // }, []);
    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        filterRooms();
    }, [type, capacity, price, minSize, maxSize, breakfast, pets]);

    function formatData(items) {
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url);
            let room = {...item.fields, images, id};
            return room;
        });
        return tempItems;
    }

    // const getRoom = (slug) => {
    //     let tempRooms = [...rooms];
    //     const room = tempRooms.find(room => room.slug === slug);
    //     return {...room};
    // };
    function getRoom(slug) {
        let tempRooms = [...rooms];
        const room = tempRooms.find(room => room.slug === slug);
        return room;
    };

    const handleChange = event => {
        // const type = event.target.type;
        // const name = event.target.name;
        // const value = event.target.value;
        // console.log(`[TYPE]: ${type}, [NAME]: ${name}, [VALUE]: ${value}`);
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = event.target.name;
        switch(name) {
            case 'type':
                setType(value);
                break;
            case 'capacity':
                setCapacity(parseInt(value));
                break;
            case 'price':
                setPrice(parseInt(value));
                break;
            case 'minSize':
                setMinSize(parseInt(value));
                break;
            case 'maxSize':
                setMaxSize(parseInt(value));
                break;
            case 'breakfast':
                setBreakfast(value);
                break;
            case 'pets':
                setPets(value);
                break;
            default:
                break;
        }
    };

    const filterRooms = () => {
        // all the rooms
        let tempRooms = [...rooms];
        
        // filter by type
        if(type !== 'all') {
            tempRooms = tempRooms.filter(room => room.type === type);
        }

        // filter by capacity
        if(capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity);
        }

        // filter by price
        tempRooms = tempRooms.filter(room => room.price <= price);

        // filter by size
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize);

        // filter by breakfast
        if(breakfast) {
            tempRooms = tempRooms.filter(room => room.breakfast === true);
        }

        // filter by pets
        if(pets) {
            tempRooms = tempRooms.filter(room => room.pets === true);
        }

        // change state
        setSortedRooms(tempRooms);
    };

    return (
        <RoomContext.Provider value={
            {rooms,
            featuredRooms,
            sortedRooms,
            loading,
            getRoom,
            handleChange,
            type,
            capacity,
            price,
            minPrice,
            maxPrice,
            minSize,
            maxSize,
            breakfast,
            pets}}>
            {props.children}
        </RoomContext.Provider>
    );
};

export { RoomContext, RoomProvider };