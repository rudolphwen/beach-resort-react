import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';


const Title = ({ title }) => {
    return (
        <div className="section-title">
            <h4>{title}</h4>
            <div />
        </div>
    );
};

export default Title;