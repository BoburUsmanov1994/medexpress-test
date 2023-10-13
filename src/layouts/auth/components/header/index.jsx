import React from 'react';
import Brand from "../../../../components/brand";
import Wrapper from "../../../../components/wrapper";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Language from "../../../../components/language";

const Index = () => {
    const {t} = useTranslation()
    return (
        <header className={'py-4 mb-20'}>
            <Wrapper full={false}>
                <div className="flex items-center justify-between">
                    <div className={'flex items-center'}>
                        <div className="mr-6">
                            <Brand/>
                        </div>
                        <ul className={'flex items-center'}>
                            <li className={'ml-12 hover:text-primary transition'}>
                                <NavLink to={'#'}>{t("Вопросы-ответы")}</NavLink>
                            </li>
                            <li className={'ml-12 hover:text-primary transition'}>
                                <NavLink to={'#'}>{t("Инструкция")}</NavLink>
                            </li>
                        </ul>
                    </div>
                    <Language dark />
                </div>
            </Wrapper>
        </header>
    );
};

export default Index;