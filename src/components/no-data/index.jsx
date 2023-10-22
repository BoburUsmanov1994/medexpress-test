import React from 'react';
import {useTranslation} from "react-i18next";

const Nodata = () => {
    const {t} = useTranslation()
    return (
        <div className={'w-100 p-5 pt-7 text-center font-semibold'}>
            {t("Нет данных")}
        </div>
    );
};

export default Nodata;