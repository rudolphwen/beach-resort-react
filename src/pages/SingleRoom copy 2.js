import React, { useContext, useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import defaultBcg from '../images/room-1.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { RoomContext } from '../context';
import StyledHero from '../components/StyledHero';

const SingleRoom = (props) => {
    // console.log(props);
    const { getRoom } = useContext(RoomContext);
    const [slug, setSlug] = useState(props.match.params.slug);
    const [room, setRoom] = useState();
    const [defaultBcgImg, setDefaultBcgImg] = useState(defaultBcg);

    // const slug = props.match.params.slug;
    const tempRoom = getRoom(slug);

    console.log('[slug]', slug);
    console.log('[tempRoom]', tempRoom);
    // console.log('[SingleRoom]', room);
    // const { name, description, capacity, size, price, extras, breakfast, pets, images } = room;

    useEffect(() => {
        const slug = props.match.params.slug;
        console.log('[useEffect]', slug);
        setRoom(getRoom(slug));
    }, []);
    
    console.log('[outside useEffect 1]', room);

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

    console.log('[outside useEffect 2]', room);

    const { name, description, capacity, size, price, extras, breakfast, pets, images } = room;
        
    return (
        <Fragment>
            {/* <div>hello from single room</div> */}
            <StyledHero img={images[0] || defaultBcgImg}>
                <Banner title={`${name} room`}>
                    <Link to="/rooms" className="btn-primary">
                        back to rooms
                    </Link>
                </Banner>
            </StyledHero>
            <section className="single-room">
                <div className="single-room-images">
                    {images.map((item, index) => {
                        return (<img key={index} src={item} alt={name} />);
                    })}
                </div>
            </section>
        </Fragment>
    );
    
};

export default SingleRoom;