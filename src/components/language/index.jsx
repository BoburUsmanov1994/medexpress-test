import React, {useState} from 'react';
import arrowIcon from "../../assets/icons/arrow-down.svg";
import Dropdown from "../dropdown";
import {useGetAllQuery} from "../../hooks/api";
import {KEYS} from "../../constants/keys";
import {URLS} from "../../constants/urls";
import {get} from "lodash"
import {useTranslation} from "react-i18next";
import {useSettingsStore} from "../../store";
import config from "../../config";
import clsx from "clsx";

const Index = ({dark = false}) => {
    const {t, i18n} = useTranslation()
    const [open,setOpen] = useState(null)
    const setLang = useSettingsStore(state => get(state, 'setLang', () => {
    }))
    const lang = useSettingsStore(state => get(state, 'lang', config.DEFAULT_APP_LANG))

    const changeLang = (code = "ru") => {
        setLang(code);
        setOpen(false);
        return i18n.changeLanguage(code)
    }
    const {data} = useGetAllQuery({key: KEYS.locales, url: URLS.locales,enabled:false})

    return (<div className={'mr-8'}>
        <Dropdown changeDefaultOpen={()=>setOpen(null)} defaultOpen={open} btn={<div className={'inline-flex items-center cursor-pointer  font-semibold'}>
            <span>{t(lang)}</span>
            <img src={arrowIcon} alt=""/>
        </div>}>
            <ul>
                {
                    get(data,'data',[]).map((item)=><li onClick={()=>changeLang(get(item,'code'))} className={clsx('text-center mb-1 font-semibold cursor-pointer hover:text-primary',{'!text-primary':get(item,'code') == lang})} key={get(item,'code')}>{t(get(item,'code'))}</li>)
                }
            </ul>
        </Dropdown>
    </div>);
};

export default Index;