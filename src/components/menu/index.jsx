import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Menu = () => {
    const {t} = useTranslation()
    return (
        <ul className={'flex items-center relative  z-50'}>
            <li className={'menu__item group'}>
                <NavLink className={'menu__item_link'} to={'/'}>{t('Статистика')}</NavLink>
            </li>
            <li className={'menu__item group'}>
                <NavLink className={'menu__item_link'} to={'/hrm/organizations'}>{t("Организации")}</NavLink>
                {/*<ul className="absolute z-5 bg-white  rounded-b-xl invisible group-hover:visible  -left-6 -right-6 top-2/3 py-3">*/}
                {/*    <li className={'mb-1'}>*/}
                {/*        <NavLink className={'px-3 py-1 text-black block transition hover:text-primary'}*/}
                {/*                 to={'/hrm/organizations'}>{t("Организации")}</NavLink>*/}
                {/*    </li>*/}
                {/*</ul>*/}
            </li>
            <li className={'menu__item group'}>
                <NavLink className={'menu__item_link'} to={'/hrm/practitioners'}>{t("Сотрудники")}</NavLink>
            </li>

            <li className={'menu__item group'}>
                <NavLink className={'menu__item_link'} to={'/settings'}>{t("Администрирование")}</NavLink>
                <ul className="absolute z-50 bg-white  rounded-b-xl invisible group-hover:visible  -left-6 -right-6 top-2/3 py-3 w-[225px]">
                    <li className={'mb-1'}>
                        <NavLink className={'px-3 py-1 text-black block transition hover:text-primary'}
                                 to={'/settings/translations'}>{t("Переводы")}</NavLink>
                    </li>
                </ul>
            </li>
            <li className={'menu__item group'}>
                <NavLink className={'menu__item_link'} to={'/patient'}>{t("Пациент")}</NavLink>
                <ul className="absolute z-5 bg-white  rounded-b-xl invisible group-hover:visible  -left-6 -right-6 top-2/3 py-3 w-[150px]">
                    <li className={'mb-1'}>
                        <NavLink className={'px-3 py-1 text-black block transition hover:text-primary'}
                                 to={'/patient/clinics'}>{t("Поликлиника")}</NavLink>
                    </li>
                    <li className={'mb-1'}>
                        <NavLink className={'px-3 py-1 text-black block transition hover:text-primary'}
                                 to={'/patient/stationary'}>{t("Стационарный")}</NavLink>
                    </li>
                </ul>
            </li>
        </ul>
    );
};

export default Menu;