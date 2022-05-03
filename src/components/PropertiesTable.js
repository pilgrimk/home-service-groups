import React, { useState } from 'react';
import './PropertiesTable.css';
import Pagination from './Pagination';

export default function PropertiesTable({ properties }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [propsPerPage] = useState(10);

    //get current posts
    const indexOfLastProp = currentPage * propsPerPage;
    const indexOfFirstProp = indexOfLastProp - propsPerPage;
    const currentProps = properties.slice(indexOfFirstProp, indexOfLastProp);

    //change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    function toCurrency(numberString) {
        let number = parseFloat(numberString);
        return number.toLocaleString('USD');
    }

    return (
        <>
            <table className='content-table'>
                <thead>
                    <tr>
                        <th>Price</th>
                        <th>SqFt</th>
                        <th>Price/SqFt</th>
                        <th>Beds</th>
                        <th>Baths</th>
                        <th>HOA</th>
                        <th>Location</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Year Built</th>
                        <th>Days Listed</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>{currentProps.map(function (data, key) {
                    return (
                        <tr key={key}>
                            <td>{toCurrency(data.price)}</td>
                            <td>{data.sqFt}</td>
                            <td>{data.pricePerSqFt}</td>
                            <td>{data.beds}</td>
                            <td>{data.baths}</td>
                            <td>{data.hoa}</td>
                            <td>{data.location}</td>
                            <td>{data.streetLine}</td>
                            <td>{data.city}</td>
                            <td>{data.state}</td>
                            <td>{data.yearBuilt}</td>
                            <td>{data.daysListed}</td>
                            <td>
                                <a href={data.url} target="_blank" rel="noreferrer">
                                    <button class="detail-button fa-solid fa-ellipsis">...</button>
                                </a>
                            </td>
                        </tr>
                    )
                })}</tbody>
            </table>

            <Pagination
                propsPerPage={propsPerPage}
                totalProps={properties.length}
                paginate={paginate} />
        </>
    )
}