import React, { useContext } from 'react';
import { RoomContext } from '../context';
import Title from './Title';

const RoomsFilter = ({rooms}) => {
    const context = useContext(RoomContext);
    const {
        handleChange,
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

    // get all unique values
    const getUnique = (items, value) => {
        return [...new Set(items.map(item => item[value]))];
    };

    // get unique types
    let types = getUnique(rooms, 'type');
    // add 'all'
    types = ['all', ...types];
    // map to jsx
    types = types.map((item, index) => {
        return <option key={index} value={item}>{item}</option>;
    });

    let people = getUnique(rooms, 'capacity');
    people = people.map((item, index) => {
        return <option key={index} value={item}>{item}</option>;
    });
    
    return (
        <section className="filter-container">
            <Title title="search rooms" />
            <form className="filter-form">
                {/* select type */}
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select
                        name="type"
                        id="type"
                        value={type}
                        className="form-control"
                        onChange={handleChange}>
                            {/* <option value="single">single</option> */}
                            {types}
                    </select>
                </div>
                {/* end select type */}
                {/* guests */}
                <div className="form-group">
                    <label htmlFor="capacity">guests</label>
                    <select
                        name="capacity"
                        id="capacity"
                        value={capacity}
                        className="form-control"
                        onChange={handleChange}>
                            {/* <option value="single">single</option> */}
                            {people}
                    </select>
                </div>
                {/* end guests */}
                {/* room price */}
                <div className="form-group">
                    <label htmlFor="price">room price ${price}</label>
                    <input
                        name="price"
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        id="price"
                        value={price}
                        className="form-control"
                        onChange={handleChange} /> 
                </div>
                {/* end room price */}
                {/* size */}
                <div className="form-group">
                    <label htmlFor="size">room size</label>
                    <div className="size-inputs">
                        <input
                            name="minSize"
                            type="number"
                            id="size"
                            value={minSize}
                            className="size-input"
                            onChange={handleChange} />
                        <input
                            name="maxSize"
                            type="number"
                            id="size"
                            value={maxSize}
                            className="size-input"
                            onChange={handleChange} />
                    </div> 
                </div>
                {/* end size */}
                {/* extras */}
                <div className="form-group">
                    <div className="single-extra">
                        <input
                            name="breakfast"
                            type="checkbox"
                            id="breakfast"
                            checked={breakfast}
                            onChange={handleChange} />
                        <label htmlFor="breakfast">breakfast</label>
                    </div> 
                    <div className="single-extra">
                        <input
                            name="pets"
                            type="checkbox"
                            id="pets"
                            checked={pets}
                            onChange={handleChange} />
                        <label htmlFor="pets">pets</label>
                    </div> 
                </div>
                {/* end extras */}
            </form>
        </section>
    );
};

export default RoomsFilter;