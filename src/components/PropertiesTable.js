import React from 'react'
import './PropertiesTable.css'

export default function PropertiesTable({ properties }) {
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
                    <th>Location</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Year Built</th>
                    <th>Time Listed</th>
                </tr>
            </thead>
            <tbody>{properties.map(function (data, key) {
                return (
                    <tr key={key}>
                        <td>{data.price}</td>
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
                        <td>{data.timeOnRedfin}</td>
                    </tr>
                )
            })}</tbody>
        </table>
    )
}