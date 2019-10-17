import React, { useState } from 'react';
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa';

import Title from './Title';

const Services = () => {
    const [services] = useState([
        {
            icon: <FaCocktail />,
            title: 'free cocktails',
            info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, nam.'
        },
        {
            icon: <FaHiking />,
            title: 'Endless Hiking',
            info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, nam.'
        },
        {
            icon: <FaShuttleVan />,
            title: 'Free shuttle',
            info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, nam.'
        },
        {
            icon: <FaBeer />,
            title: 'Strongest Beer',
            info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, nam.'
        }
    ]);
    return (
        <section className="services">
            <Title title="Services" />
            <div className="services-center">
                {services.map((item, index) => {
                    return (
                        <article key={index} className="service">
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                        </article>
                    )
                })}
            </div>
        </section>
    );
};

export default Services;