import React from 'react';
import Brand from "../brand";
import Wrapper from "../wrapper";
import arrowIcon from "../../assets/icons/arrow-down.svg"
import searchIcon from "../../assets/icons/search.svg"
import bellIcon from "../../assets/icons/bell.svg"
import avatar from "../../assets/images/avatar.png"
import Menu from "../menu";
import {useNavigate} from "react-router-dom";
import Language from "../language";
import Dropdown from "../dropdown";
import {useTranslation} from "react-i18next";
import {LogOut} from "react-feather";

const Index = () => {
    const navigate = useNavigate();
    const {t} = useTranslation()
    const logout = () => {
        navigate("/auth/logout");
    }
    return (
        <header className={' bg-white py-3.5'}>
            <Wrapper>
                <div className="grid grid-cols-12 items-center">
                    <div className="col-span-2">
                        <Brand/>
                    </div>
                    <div className="col-span-7">
                        <Menu/>
                    </div>
                    <div className="col-span-3 text-right flex justify-end items-center">
                        <Language/>
                        <div className={'cursor-pointer mr-8'}>
                            <img src={searchIcon} alt=""/>
                        </div>
                        <div className={'cursor-pointer mr-8'}>
                            <img src={bellIcon} alt=""/>
                        </div>
                        <Dropdown btn={<div className="cursor-pointer flex items-center">
                            <img className={'mr-2'} src={avatar} alt="avatar"/>
                            <span className={'font-semibold text-secondary-300'}>Ахмедов С.</span>
                            <img src={arrowIcon} alt=""/>
                        </div>}>
                            <ul>
                                <li className={'cursor-pointer p-2 font-semibold flex items-center'} onClick={logout}><LogOut className={'mr-1.5'} size={18} /><span>{t("Logout")}</span></li>
                            </ul>
                        </Dropdown>

                    </div>
                </div>
            </Wrapper>
        </header>
    );
};

export default Index;