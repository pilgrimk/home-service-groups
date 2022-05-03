import React from 'react';
import './Pagination.css';

const Pagination = ({ propsPerPage, totalProps, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProps / propsPerPage); i++) {
        pageNumbers.push(i);
    };

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={()=>paginate(number)} 
                        href="#top"
                        className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination;