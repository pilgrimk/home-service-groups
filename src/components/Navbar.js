import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FiAlignRight, FiXCircle, FiChevronDown } from "react-icons/fi"
import './Navbar.css'

export default function Navbar() {
    const [isMenu, setisMenu] = useState(false);
    const [isResponsiveclose, setResponsiveclose] = useState(false);

    const toggleClass = () => {
        setisMenu(isMenu === false ? true : false);
        setResponsiveclose(isResponsiveclose === false ? true : false);
    };

    let boxClass = ["main-menu menu-right menuq1"];
    if (isMenu) {
        boxClass.push('menuq2');
    } else {
        boxClass.push('');
    }

    const [isMenuSubMenu, setMenuSubMenu] = useState(false);

    const toggleSubmenu = () => {
        setMenuSubMenu(isMenuSubMenu === false ? true : false);
    };

    let boxClassSubMenu = ["sub__menus"];
    if (isMenuSubMenu) {
        boxClassSubMenu.push('sub__menus__Active');
    } else {
        boxClassSubMenu.push('');
    }

    return (
        <header className="header_middle">
            <div className="container">
                <div className="header_row">
                    {/* Add Logo  */}
                    <div className="header_middle_logo">
                        <NavLink to="/">
                            Home Service Groups
                        </NavLink>
                    </div>

                    <div className="header__middle__menus">
                        <nav className="main-nav " >

                            {/* Responsive Menu Button */}
                            {isResponsiveclose === true ? <>
                                <span className="menubar__button"
                                    style={{ display: 'none' }}
                                    onClick={toggleClass} >
                                    <FiXCircle />
                                </span>
                            </> : <>
                                <span className="menubar__button"
                                    style={{ display: 'none' }}
                                    onClick={toggleClass} >
                                    <FiAlignRight />
                                </span>
                            </>
                            }

                            <ul className={boxClass.join(' ')}>
                                <li className="menu-item" >
                                    <NavLink onClick={toggleClass} to={`/`}> Home
                                    </NavLink>
                                </li>
                                <li onClick={toggleSubmenu}
                                    className="menu-item sub__menus__arrows" >
                                    <NavLink to="#"> Services
                                        <FiChevronDown />
                                    </NavLink>
                                    <ul className={boxClassSubMenu.join(' ')} >
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                to={`/find-properties`}> Find Properties
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}
