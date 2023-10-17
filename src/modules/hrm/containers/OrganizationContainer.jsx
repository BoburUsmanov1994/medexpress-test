import React from 'react';
import Title from "../../../components/title";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {ChevronLeft, Edit2} from "react-feather";
import {useGetOneQuery} from "../../../hooks/api";
import {URLS} from "../../../constants/urls";
import {OverlayLoader} from "../../../components/loader";
import {get, head} from "lodash";
import {Tab, Tabs} from "../../../components/tab";
import Content from "../../../components/content";
import photoImg from "../../../assets/images/photo.png";
import mapImg from "../../../assets/images/map.png";

const OrganizationContainer = ({id = null}) => {
    const {t} = useTranslation();
    const {data, isLoading} = useGetOneQuery({id: id, url: URLS.organizations})
    if (isLoading) {
        return <OverlayLoader/>
    }
    return (<div>
            <div className="grid grid-cols-12">
                <div className="col-span-12 mb-5">
                    <Link className={'text-primary  font-bold inline-flex items-center'}
                          to={'/hrm/organizations'}><ChevronLeft className={'mr-1'}/>{t("Назад к списку")}</Link>
                </div>
                <div className="col-span-12 mb-4">
                    <Title>{get(data, 'data.display')}</Title>
                </div>
                <div className="col-span-12">
                    <Tabs>
                        <Tab tab={'info'} label={t('Информация')}>
                            <Content sm>
                                <div className="grid grid-cols-12 mb-6">
                                    <div className="col-span-8">
                                        <Title sm>{t('Данные при регистрации')}</Title>
                                    </div>
                                    <div className="col-span-4 text-right">
                                        <button
                                            className={'inline-flex items-center py-2 px-4 text-sm font-bold text-primary border border-primary rounded-lg'}>
                                            <Edit2 size={18} className={'mr-3'}/>
                                            {t("Редактировать данные")}
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-x-16">
                                    <div className="col-span-9">
                                        <div className={'flex py-5 border-b items-center'}>
                                            <span className={'w-1/3'}>ИНН:</span>
                                            <strong className={'w-2/3'}>{get(data, 'data.tin')}</strong>
                                        </div>
                                        <div className={'flex py-5 border-b items-center'}>
                                            <span className={'w-1/3'}>Родительская организация:</span>
                                            <strong className={'w-2/3'}>{get(data, 'data.parent.display')}</strong>
                                        </div>
                                        <div className={'flex py-5 border-b items-center'}>
                                            <span className={'w-1/3'}>Тип организации:</span>
                                            <strong
                                                className={'w-2/3'}>{get(data, 'data.medical_type.display')}</strong>
                                        </div>
                                        <div className={'flex py-5 border-b items-center'}>
                                            <span className={'w-1/3'}>Уровень оказания услуг:</span>
                                            <strong className={'w-2/3'}>{get(data, 'data.level.display')}</strong>
                                        </div>
                                        <div className={'flex py-5 border-b items-center'}>
                                            <span className={'w-1/3'}>Форма собственности:</span>
                                            <strong className={'w-2/3'}>{get(data, 'data.legal_form.display')}</strong>
                                        </div>
                                        <div className={'flex py-5 border-b items-center'}>
                                            <span className={'w-1/3'}>Виды оказания услуг:</span>
                                            <strong
                                                className={'w-2/3'}>{get(data, 'data.service_types', []).map(({display = null}) => `${display}, `)}</strong>
                                        </div>
                                        <div className={'flex py-5 border-b items-center'}>
                                            <span className={'w-1/3'}>Полное наименование:</span>
                                            <strong className={'w-2/3'}>{get(data, 'data.display')}</strong>
                                        </div>
                                        <div className={'flex py-5 border-b items-center'}>
                                            <span className={'w-1/3'}>Краткое наименование:</span>
                                            <strong className={'w-2/3'}>{get(data, 'data.display')}</strong>
                                        </div>
                                        <div className={'flex py-5 border-b items-center'}>
                                            <span className={'w-1/3'}>Адрес:</span>
                                            <strong
                                                className={'w-2/3'}>{`${get(head(get(data, 'data.locations', [])), 'address.state.display')}, ${get(head(get(data, 'data.locations', [])), 'address.city.display')}`}</strong>
                                        </div>
                                        <div className={'flex py-5 border-b items-center'}>
                                            <span className={'w-1/3'}>Регион обслуживания:</span>
                                            <strong className={'w-2/3'}>Сырдарьинская область</strong>
                                        </div>
                                        <div className={'flex py-5 border-b items-center'}>
                                            <span className={'w-1/3'}>Телефон:</span>
                                            <strong className={'w-2/3'}>+998 67 123 12 12</strong>
                                        </div>
                                        <div className={'flex py-5 border-b items-center'}>
                                            <span className={'w-1/3'}>Электронная почта:</span>
                                            <strong className={'text-primary w-2/3'}>boyovut.ttb@ssv.uz</strong>
                                        </div>
                                    </div>
                                    <div className="col-span-3">
                                        <img className={'mb-6 object-cover'} src={photoImg} alt=""/>
                                        <img className={'object-cover'} src={mapImg} alt=""/>
                                    </div>
                                </div>
                            </Content>
                        </Tab>
                        <Tab tab={'employees'} label={t('Сотрудники')}>
                            <Content sm>Сотрудники</Content>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default OrganizationContainer;