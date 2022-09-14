import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper
} from '@mui/material';

const PropertiesTable = ({ currentProps }) => {
    function toCurrency(numberString) {
        let number = parseFloat(numberString);
        return number.toLocaleString('USD');
    };

    return (
        <TableContainer component={Paper} sx={{mt: '20px'}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Address</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">SqFt</TableCell>
                        <TableCell align="right">Price/SqFt</TableCell>
                        <TableCell align="right">Beds</TableCell>
                        <TableCell align="right">Baths</TableCell>
                        <TableCell align="right">HOA</TableCell>
                        <TableCell align="right">City</TableCell>
                        <TableCell align="right">Year Built</TableCell>
                        <TableCell align="right">Days Listed</TableCell>
                        <TableCell align="right">Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentProps.map((data, key) => (
                        <TableRow
                            key={key}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {data.streetLine}
                            </TableCell>
                            <TableCell align="right">{toCurrency(data.price)}</TableCell>
                            <TableCell align="right">{data.sqFt}</TableCell>
                            <TableCell align="right">{data.pricePerSqFt}</TableCell>
                            <TableCell align="right">{data.beds}</TableCell>
                            <TableCell align="right">{data.baths}</TableCell>
                            <TableCell align="right">{data.hoa}</TableCell>
                            <TableCell align="right">{data.city}</TableCell>
                            <TableCell align="right">{data.yearBuilt}</TableCell>
                            <TableCell align="right">{data.daysListed}</TableCell>
                            <TableCell>
                                <a href={data.url} target="_blank" rel="noreferrer">
                                    <button>...</button>
                                </a>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default PropertiesTable
