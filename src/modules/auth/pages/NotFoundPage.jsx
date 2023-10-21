import React from 'react';
import Title from "../../../components/title";
import notFoundImg from "../../../assets/images/404.png";
import {useTranslation} from "react-i18next";
import {ArrowLeft, Home} from "react-feather";
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    return (
        <div className={'grid grid-cols-12 items-center'}>
            <div className="col-span-6">
                <Title className={'!text-4xl text-[#757575] mb-10'}>{t("Страница не найдена")}</Title>
                <div>
                    <Link to={'/'}
                          className={'text-lg inline-flex py-2.5 pl-2.5 pr-5 rounded-lg bg-primary items-center text-white font-semibold text-center mr-6'}>
                        <Home className={'mr-3'}/>
                        {t('Перейти на главную страницу')}
                    </Link>
                    <button
                        onClick={() => navigate(-2)}
                        className={'inline-flex text-lg items-center py-2.5 pl-2.5 pr-5 text-sm font-bold text-primary border-2 border-primary rounded-lg'}>
                        <ArrowLeft className={'mr-1.5'}/>
                        {t("Вернуться назад")}
                    </button>
                </div>
            </div>
            <div className="col-span-6 text-right">
                <img className={'object-contain mx-auto'} src={notFoundImg} alt=""/>
            </div>
        </div>
    );
};

export default NotFoundPage;