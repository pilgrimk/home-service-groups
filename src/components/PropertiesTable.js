import React from 'react'
import './PropertiesTable.css'

export default function PropertiesTable({ currentProps }) {
    function toCurrency(numberString) {
        let number = parseFloat(numberString);
        return number.toLocaleString('USD');
    }

    return (
            <table className='content-table'>
                <thead>
                    <tr>
                        <th>Price</th>
                        <th>SqFt</th>
                        <th>Price/SqFt</th>
                        <th>Beds</th>
                        <th>Baths</th>
                        <th>HOA</th>
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
                            <td>{data.streetLine}</td>
                            <td>{data.city}</td>
                            <td>{data.state}</td>
                            <td>{data.yearBuilt}</td>
                            <td>{data.daysListed}</td>
                            <td>
                                <a href={data.url} target="_blank" rel="noreferrer">
                                    <button className="detail-button fa-solid fa-ellipsis">...</button>
                                </a>
                            </td>
                        </tr>
                    )
                })}</tbody>
            </table>
    )
}