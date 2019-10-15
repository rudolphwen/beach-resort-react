import React, { useContext, Fragment } from 'react';
import RoomsFilter from './RoomsFilter';
import RoomsList from './RoomsList';
import Loading from './Loading';
import { RoomContext } from '../context';

const RoomsContainer = () => {
    const { loading, sortedRooms, rooms } = useContext(RoomContext);

    if(loading) {
        return <Loading />;
    }

    return (
        <Fragment>
            <RoomsFilter rooms={rooms} />
            <RoomsList rooms={sortedRooms} />
        </Fragment>
    );
};

export default RoomsContainer;