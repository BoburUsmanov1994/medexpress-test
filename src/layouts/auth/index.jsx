import React from 'react';
import {Link, Outlet} from "react-router-dom";
import {useTranslation} from "react-i18next";
import authBgImg from "../../assets/images/auth-bg.png"
import Header from "./components/header";
import Wrapper from "../../components/wrapper";
import authImg from "../../assets/images/auth-img.png";


const AuthLayout = () => {
    const {t} = useTranslation()
    return (
        <div style={{backgroundImage: `url(${authBgImg})`}} className={`h-screen bg-cover  bg-center bg-no-repeat`}>
            <Header/>
            <Wrapper>
                <div className={'px-16'}>
                    <div className="grid grid-cols-12">
                        <div className="col-span-8">
                            <h1 className={'text-5xl font-bold mb-16'}>{t("Фонд государственного")} <br/> <span
                                className={'text-primary'}>{t("медицинского страхования")}</span></h1>
                            <img className={'object-fit'} src={authImg} alt=""/>
                        </div>
                        <div className="col-span-4">
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};

export default AuthLayout;