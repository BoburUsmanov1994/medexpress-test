import React from 'react';
import Title from "../../../components/title";
import {useTranslation} from "react-i18next";
import {Link, useNavigate} from "react-router-dom";
import {ChevronLeft} from "react-feather";
import Content from "../../../components/content";
import {KEYS} from "../../../constants/keys";
import {useGetOneQuery} from "../../../hooks/api";
import {URLS} from "../../../constants/urls";
import {OverlayLoader} from "../../../components/loader";
import patientImg from "../../../assets/images/patient.png";
import {find, get, isEqual} from "lodash";
import phoneIcon from "../../../assets/icons/phone.svg";
import mobileIcon from "../../../assets/icons/mobile.svg";
import emailIcon from "../../../assets/icons/mail.svg";
import homeIcon from "../../../assets/icons/home.svg";
import serviceIcon from "../../../assets/icons/category.svg";
import chevronRightIcon from "../../../assets/icons/chevron-right-green.svg";

const PatientContainer = ({id}) => {
    const {t} = useTranslation();
    const navigate = useNavigate()
    const {data, isLoading} = useGetOneQuery({id: id, url: URLS.patients, key: [KEYS.patients, id]})

    if (isLoading) {
        return <OverlayLoader/>
    }
    console.log('data', data)
    return (<>
            <div className="grid grid-cols-12">
                <div className="col-span-12 mb-5">
                    <Link className={'text-primary  font-bold inline-flex items-center'}
                          to={'/patient'}><ChevronLeft className={'mr-1'}/>{t("Назад к списку")}</Link>
                </div>
                <div className="col-span-12">
                    <Content sm>
                        <Title className={'mb-6'}>{t("Профиль пациента")}</Title>
                        <div className="grid grid-cols-12 gap-x-10">
                            <div className="col-span-4">
                                <div
                                    className={"p-6 rounded-xl shadow-xl drop-shadow-xl border-[3px] border-[rgba(0,0,0,0.1)]"}>
                                    <div className={'flex items-center'}>
                                        <img src={patientImg} alt=""/>
                                        <h2 className={'text-lg ml-5 font-bold'}>{get(data, 'data.payload.patient.display_last_name')} {get(data, 'data.payload.patient.display_first_name')} {get(data, 'data.payload.patient.display_middle_name')}</h2>
                                    </div>
                                    <h3 className={'text-lg font-bold mt-3'}>Контактная информация:</h3>
                                    <ul>
                                        {get(find(get(data, 'data.payload.patient.telecoms', []), item => isEqual(get(item, 'system.id'), 1)), 'value') &&
                                            <li className={'flex items-center mt-5'}>
                                                <img className={'flex-none'} src={phoneIcon} alt=""/>
                                                <span
                                                    className={'ml-4'}>+{get(find(get(data, 'data.payload.patient.telecoms', []), item => isEqual(get(item, 'system.id'), 1)), 'value')}</span>
                                            </li>}
                                        {get(find(get(data, 'data.payload.patient.telecoms', []), item => isEqual(get(item, 'system.id'), 1)), 'value') &&
                                            <li className={'flex items-center mt-4'}>
                                                <img className={'flex-none'} src={mobileIcon} alt=""/>
                                                <span
                                                    className={'ml-4'}>+{get(find(get(data, 'data.payload.patient.telecoms', []), item => isEqual(get(item, 'system.id'), 1)), 'value')}</span>
                                            </li>}
                                        {get(find(get(data, 'data.payload.patient.telecoms', []), item => isEqual(get(item, 'system.id'), 2)), 'value') &&
                                            <li className={'flex items-center mt-4'}>
                                                <img className={'flex-none'} src={emailIcon} alt=""/>
                                                <span
                                                    className={'ml-4'}>{get(find(get(data, 'data.payload.patient.telecoms', []), item => isEqual(get(item, 'system.id'), 2)), 'value')}</span>
                                            </li>}
                                        <li className={'flex items-center mt-4'}>
                                            <img className={'flex-none'} src={homeIcon} alt=""/>
                                            <span
                                                className={'ml-4'}>{get(find(get(data, 'data.payload.patient.addresses', []), item => isEqual(get(item, 'use.id'), 4)), 'line')}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-span-8">
                                <div
                                    className={"p-6 rounded-xl shadow-xl drop-shadow-xl border-[3px] border-[rgba(0,0,0,0.1)]"}>
                                    <h4 className={'text-lg font-bold mb-6'}>Информация о пациенте:</h4>
                                    <div className="grid grid-cols-12">
                                        <div className="col-span-4">
                                           <div className={'mb-4'}>
                                               <h4 className={'mb-1.5 text-[#808080] font-semibold'}>Пол:</h4>
                                               <p className={' font-semibold'}>{get(data,'data.payload.patient.gender.display')}</p>
                                           </div>
                                            <div className={'mb-4'}>
                                                <h4 className={'mb-1.5 text-[#808080] font-semibold'}>Предыдущий визит:</h4>
                                                <p className={' font-semibold'}>25.11.2022</p>
                                            </div>
                                        </div>
                                        <div className="col-span-4">
                                            <div className={'mb-4'}>
                                                <h4 className={'mb-1.5 text-[#808080] font-semibold'}>Дата рождения:</h4>
                                                <p className={' font-semibold'}>{get(data,'data.payload.patient.birth_date')}</p>
                                            </div>
                                            <div className={'mb-4'}>
                                                <h4 className={'mb-1.5 text-[#808080] font-semibold'}>Следующий визит:</h4>
                                                <p className={' font-semibold'}>27.11.2022</p>
                                            </div>
                                        </div>
                                        <div className="col-span-4">
                                            <div className={'mb-4'}>
                                                <h4 className={'mb-1.5 text-[#808080] font-semibold'}>Экстренный контакт:</h4>
                                                {/*<p className={' font-semibold'}>{get(data,'data.payload.patient.birth_date')}</p>*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={"p-6 rounded-xl shadow-xl drop-shadow-xl border-[3px] border-[rgba(0,0,0,0.1)] mt-6"}>
                                    <div className="grid grid-cols-12 gap-x-6">
                                        <div className="col-span-4  border-2 border-[#E5E5E5] rounded py-2 px-3 flex items-center cursor-pointer mb-6 justify-between pr-6">
                                            <img src={serviceIcon} alt="service"/>
                                           <span className={'ml-3'}> Амбулаторный прием
                                            025 форма</span>
                                            <img className={'ml-4'} src={chevronRightIcon} alt="chevronRightIcon"/>
                                        </div>
                                        <div className="col-span-4  border-2 border-[#E5E5E5] rounded py-2 px-3 flex items-center cursor-pointer mb-6 justify-between pr-6">
                                            <img src={serviceIcon} alt="service"/>
                                            <span className={'ml-3'}> Больничные листы</span>
                                            <img className={'ml-4'} src={chevronRightIcon} alt="chevronRightIcon"/>
                                        </div>
                                        <div className="col-span-4  border-2 border-[#E5E5E5] rounded py-2 px-3 flex items-center cursor-pointer mb-6 justify-between pr-6">
                                            <img src={serviceIcon} alt="service"/>
                                            <span className={'ml-3'}> "Д" учета </span>
                                            <img className={'ml-4'} src={chevronRightIcon} alt="chevronRightIcon"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Content>
                </div>
            </div>
        </>
    );
}

export default PatientContainer;