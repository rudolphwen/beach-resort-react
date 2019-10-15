import React, { useContext, useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import defaultBcg from '../images/room-1.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { RoomContext } from '../context';
import StyledHero from '../components/StyledHero';

const SingleRoom = (props) => {
    console.log(props);
    const { getRoom } = useContext(RoomContext);
    const [slug, setSlug] = useState(props.match.params.slug);
    const [defaultBcgImg, setDefaultBcgImg] = useState(defaultBcg);

    const room = getRoom(slug);

    console.log('[slug]', slug);
    console.log('[room 1]', room);

    const testString = 'this is a breakpoint';

    console.log('hello', testString);

    if (testString !== 'work') {
        console.log('this can be reached');
    }

    console.log('how about this');

    if(!slug) {
        return <h1>not a slug</h1>
    }

    if(!room) {
        return (
            <div className="error">
                <h3>no such room could be found...</h3>
                <Link to="/rooms" className="btn-primary">
                    back to rooms
                </Link>
            </div>
        );
    }

    console.log('[room 2]', room);

    const { name, description, capacity, size, price, extras, breakfast, pets, images } = room;
    // const [mainImg, img1, img2] = images;
    const [mainImg, ...defaultImg] = images;
    console.log(defaultImg);
        
    return (
        <Fragment>
            {/* <div>hello from single room</div> */}
            {/* <StyledHero img={images[0] || defaultBcgImg}> */}
            <StyledHero img={mainImg || defaultBcgImg}>
                <Banner title={`${name} room`}>
                    <Link to="/rooms" className="btn-primary">
                        back to rooms
                    </Link>
                </Banner>
            </StyledHero>
            <section className="single-room">
                <div className="single-room-images">
                    {/* {images.map((item, index) => { */}
                    {defaultImg.map((item, index) => {
                        return (<img key={index} src={item} alt={name} />);
                    })}
                </div>
                <div className="single-room-info">
                    <article className="desc">
                        <h3>details</h3>
                        <p>{description}</p>
                    </article>
                    <article className="info">
                        <h3>info</h3>
                        <h6>price: ${price}</h6>
                        <h6>size: {size} SQFT</h6>
                        <h6>max capacity: {capacity > 1 ? `${capacity} people` : `${capacity} person`}</h6>
                        <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
                        <h6>{breakfast && "free breakfast included"}</h6>
                    </article>
                </div>
            </section>
            <section className="room-extras">
                <h6>extras</h6>
                <ul className="extras">
                    {extras.map((item, index) => {
                        return <li key={index}>- {item}</li>
                    })}
                </ul>
            </section>
        </Fragment>
    );
    
};

export default SingleRoom;