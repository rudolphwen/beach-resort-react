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
    const [room, setRoom] = useState({});
    const [defaultBcgImg, setDefaultBcgImg] = useState(defaultBcg);

    useEffect(() => {
        const room = getRoom(slug);
        setRoom(room);
        console.log('[SingleRoom]', room);
        // console.log(typeof(room.images));
        // console.log(room.images[0]);    //can access rooms.images[0] inside useEffect hook
    }, [slug, getRoom]);

    // const room = getRoom(slug);
    // console.log('[SingleRoom]', room);
    const { name, description, capacity, size, price, extras, breakfast, pets, images } = room;
    // console.log(room.images);
    // console.log(room.images[0]);
    const imagesArr = [];
    for(const key in images) {
        imagesArr.push(images[key]);
    }

    console.log(imagesArr[0]);
    const imageOne = room && images ? images[0] : null;
    console.log(imageOne);
    // console.log(images[0]);  // SingleRoom.js:36 Uncaught TypeError: Cannot read property '0' of undefined

    if(!room) {
        return (
            <div className="error">
                <h3>no such room could be found...</h3>
                <Link to="/rooms" className="btn-primary">
                    back to rooms
                </Link>
            </div>
        );
    } else {
        return (
            <Fragment>
                {/* <div>hello from single room</div>
                <StyledHero img={imagesArr[0]}> */}
                <StyledHero img={imageOne || defaultBcgImg}>
                    <Banner title={`${name} room`}>
                        <Link to="/rooms" className="btn-primary">
                            back to rooms
                        </Link>
                    </Banner>
                </StyledHero>
                <section className="single-room">
                    {images.map((item, index) => {
                        return (<img key={index} src={item} alt={name} />);
                    })}
                </section>
            </Fragment>
        );
    }
    
};

export default SingleRoom;