import React from 'react';
import {useTranslation} from "react-i18next";
import {Search} from "react-feather";
import {useForm} from "react-hook-form"

const Index = ({
                   handleSearch = () => {
                   }
               }) => {
    const {t} = useTranslation()
    const {
        register,
        handleSubmit,
    } = useForm()

    const onSubmit = ({search = undefined}) => {
        handleSearch(search)
    }
    return (
        <form className={'relative'} onSubmit={handleSubmit(onSubmit)}>
            <Search color={'#A7A7A7'} size={20} className={'absolute z-10 top-1/2 left-2.5 -translate-y-1/2'}/>
            <input {...register("search")} className={'py-2.5 pr-5 pl-10 w-80 rounded-lg outline-none'} type="text"
                   placeholder={t('Поиск по наименованию')}/>
        </form>
    );
};

export default Index;