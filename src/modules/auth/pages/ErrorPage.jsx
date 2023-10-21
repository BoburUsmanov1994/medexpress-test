import React from 'react';
import Title from "../../../components/title";
import errorImg from "../../../assets/images/500.png";
import {useTranslation} from "react-i18next";
import {ArrowLeft, Home} from "react-feather";
import {Link} from "react-router-dom";
import {useNavigate, useLocation} from 'react-router-dom';
import {get} from "lodash";


const ErrorPage = () => {
    const {t} = useTranslation()
    const location = useLocation()
    return (
        <div className={'grid grid-cols-12 items-center'}>
            <div className="col-span-6">
                <Title className={'!text-8xl  text-red-500'}>{get(location, 'state.data.status', 500)}</Title>
                <p className={'text-red-400'}>{get(location, 'state.data.detail', 'Internal Server Error')}</p>
                <div className={' mt-10'}>
                    <Link to={'/'}
                          className={'text-lg inline-flex py-2.5 pl-2.5 pr-5 rounded-lg bg-primary items-center text-white font-semibold text-center mr-6'}>
                        <Home className={'mr-3'}/>
                        {t('Перейти на главную страницу')}
                    </Link>
                </div>
            </div>
            <div className="col-span-6 text-right">
                <img className={'object-contain mx-auto'} src={errorImg} alt=""/>
            </div>
        </div>
    );
};

export default ErrorPage;