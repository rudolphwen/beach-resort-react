import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import Services from '../components/Services';
import FeaturedRooms from '../components/FeaturedRooms';

const Home = () => {
    return (
        <Fragment>
            {/* <Hero hero="defaultHero" /> */}
            <Hero>
                <Banner
                    title="luxurious rooms"
                    subtitle="deluxe rooms starting at $299">
                        <Link to="/rooms" className="btn-primary">our rooms</Link>
                </Banner>
            </Hero>
            <Services />
            <FeaturedRooms />
        </Fragment>
    );
};

export default Home;