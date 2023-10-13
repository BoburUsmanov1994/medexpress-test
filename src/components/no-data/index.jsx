import React from 'react';
import {useTranslation} from "react-i18next";

const Nodata = () => {
    const {t} = useTranslation()
    return (
        <div className={'p-5 pt-7 text-center font-semibold'}>
            {t("No data")}
        </div>
    );
};

export default Nodata;