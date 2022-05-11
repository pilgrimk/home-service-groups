import React, { useState } from 'react'
import Map from '../components/Map'
import PropertiesTable from '../components/PropertiesTable'
import Pagination from './Pagination'
import './Properties.css'

export default function Properties({ properties }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [propsPerPage] = useState(10);

    //get current posts
    const indexOfLastProp = currentPage * propsPerPage;
    const indexOfFirstProp = indexOfLastProp - propsPerPage;
    const currentProps = properties.slice(indexOfFirstProp, indexOfLastProp);

    //change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="property-display">
                <div className="mapbox-container">
                    <Map currentProps={currentProps} />
                </div>
                <PropertiesTable currentProps={currentProps} />
            </div>
            <Pagination
                propsPerPage={propsPerPage}
                totalProps={properties.length}
                paginate={paginate} />
        </>
    )
}