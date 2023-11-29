import React from 'react';
import {NavLink} from "react-router-dom";
import logo from "../../assets/images/logo-new.svg";
import logoMini from "../../assets/images/logo-new.svg";
import clsx from "clsx";

const Brand = ({className='',mini=false}) => {
    return (
        <NavLink className={clsx('inline-flex items-end',className)} to={'/'}>
            <img className={'h-12'} src={mini ? logoMini :logo} alt="logo"/>
            {!mini && <span className={'text-[#000C36] font-bold text-2xl ml-1 leading-none relative -bottom-1'}>Express</span>}
        </NavLink>
    );
};

export default Brand;