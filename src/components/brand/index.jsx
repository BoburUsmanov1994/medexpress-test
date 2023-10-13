import React from 'react';
import {NavLink} from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import logoMini from "../../assets/images/logo-mini.svg";

const Brand = ({className='',mini=false}) => {
    return (
        <NavLink className={className} to={'/'}>
            <img src={mini ? logoMini :logo} alt="logo"/>
        </NavLink>
    );
};

export default Brand;