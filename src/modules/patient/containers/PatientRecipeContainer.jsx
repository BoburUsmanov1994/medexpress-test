import React from 'react';
import Title from "../../../components/title";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {ChevronLeft} from "react-feather";
import Content from "../../../components/content";
import {KEYS} from "../../../constants/keys";
import {useGetOneQuery, usePostQuery} from "../../../hooks/api";
import {URLS} from "../../../constants/urls";
import {OverlayLoader} from "../../../components/loader";
import patientImg from "../../../assets/images/patient.png";
import {find, get, isEqual} from "lodash";
import phoneIcon from "../../../assets/icons/phone.svg";
import mobileIcon from "../../../assets/icons/mobile.svg";
import emailIcon from "../../../assets/icons/mail.svg";
import homeIcon from "../../../assets/icons/home.svg";
import orgIcon from "../../../assets/icons/org.svg";
import Form from "../../../containers/form";
import Field from "../../../containers/form/field";

const PatientRecipeContainer = ({id}) => {
    const {t} = useTranslation();
    const navigate = useNavigate()
    const {data, isLoading} = useGetOneQuery({id: id, url: URLS.patients, key: [KEYS.patients, id]})
    const {
        mutate: createEncounterRequest, isLoading: isLoadingPost
    } = usePostQuery({listKeyId: KEYS.patients})
    const createEncounter = ({data: attrs}) => {
        createEncounterRequest({url:URLS.encounters,attributes:{...attrs,patient:{id:id}}},{
            onSuccess:()=>{
                navigate(`/patient/view/${id}`)
            }
        })
    }
    if (isLoading) {
        return <OverlayLoader/>
    }
    return (<>
            {isLoadingPost && <OverlayLoader/>}
            <div className="grid grid-cols-12">
                <div className="col-span-12 mb-5">
                    <button onClick={() => navigate(-1)} className={'text-primary  font-bold inline-flex items-center'}
                    ><ChevronLeft className={'mr-1'}/>{t("Назад к пациент")}</button>
                </div>
                <div className="col-span-12">
                    <Content sm>
                        <Title className={'mb-6'}>{t("Рецепт")}</Title>
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
                                    <h4 className={'text-lg font-bold mb-6'}>Выписать рецепт:</h4>
                                    <Form classNames={'grid grid-cols-12 gap-x-6'} formRequest={createEncounter} footer={<div className={'col-span-12 '}>
                                        <div className="flex justify-end">
                                            <button onClick={() => navigate(-1)} type={'button'}
                                                    className={'text-[#7A7A7A] border-2 border-[#7A7A7A] py-3 px-6 rounded-lg mr-4 inline-block   font-bold text-center  mt-6'}>
                                                {t('Отмена')}
                                            </button>
                                            <button type={'submit'}
                                                    className={' py-3 px-6 rounded-lg bg-primary inline-block  text-white font-bold text-center  mt-6'}>
                                                {t('Сохранить')}
                                            </button>
                                        </div>
                                    </div>}>
                                        <Field
                                            type={'async-select'}
                                            url={URLS.medicationRequestCategory}
                                            keyId={KEYS.medicationRequestCategory}
                                            classNames={'col-span-6'}
                                            name={'category'}
                                            params={{
                                                required: true,
                                            }}
                                            label={<div className={'flex'}><span>{t('Category')}</span><img
                                                className={'ml-1'} src={orgIcon} alt="org"/></div>}
                                        />
                                        <Field
                                            type={'async-select'}
                                            url={URLS.medicationInn}
                                            keyId={KEYS.medicationInn}
                                            classNames={'col-span-6'}
                                            name={'medication.code'}
                                            params={{
                                                required: true,
                                            }}
                                            label={<div className={'flex'}><span>{t('Medication inn')}</span><img
                                                className={'ml-1'} src={orgIcon} alt="org"/></div>}
                                        />
                                        <Field
                                            type={'async-select'}
                                            url={URLS.ucumCommon}
                                            keyId={KEYS.ucumCommon}
                                            classNames={'col-span-6'}
                                            name={'medication.dose_unit'}
                                            params={{
                                                required: true,
                                            }}
                                            label={<div className={'flex'}><span>{t('Medication dose unit')}</span><img
                                                className={'ml-1'} src={orgIcon} alt="org"/></div>}
                                        />
                                        <Field
                                            type={'async-select'}
                                            url={URLS.ucumCommon}
                                            keyId={KEYS.ucumCommon}
                                            classNames={'col-span-6'}
                                            name={'medication.qty_unit'}
                                            params={{
                                                required: true,
                                            }}
                                            label={<div className={'flex'}><span>{t('Medication qty unit')}</span><img
                                                className={'ml-1'} src={orgIcon} alt="org"/></div>}
                                        />
                                        <Field
                                            type={'async-select'}
                                            url={URLS.medicationFormCode}
                                            keyId={KEYS.medicationFormCode}
                                            classNames={'col-span-6'}
                                            name={'medication.form'}
                                            params={{
                                                required: true,
                                            }}
                                            label={<div className={'flex'}><span>{t('Medication form')}</span><img
                                                className={'ml-1'} src={orgIcon} alt="org"/></div>}
                                        />
                                        <Field
                                            dateFormat={"yyyy-MM-dd"}
                                            type={'datepicker'}
                                            classNames={'col-span-3'}
                                            name={'valid_until'}
                                            params={{
                                                required: true,
                                            }}
                                            label={<div className={'flex'}>
                                                <span>{t('Срок действия')}</span><img
                                                className={'ml-1'} src={orgIcon} alt="org"/></div>}
                                        />
                                        <Field
                                            isMulti
                                            type={'async-select'}
                                            url={URLS.medicationDosageMethod}
                                            keyId={KEYS.medicationDosageMethod}
                                            classNames={'col-span-12'}
                                            name={'instructions'}
                                            params={{
                                                required: true,
                                            }}
                                            label={<div className={'flex'}><span>{t('Instructions')}</span><img
                                                className={'ml-1'} src={orgIcon} alt="org"/></div>}
                                        />
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </Content>
                </div>
            </div>
        </>
    );
}

export default PatientRecipeContainer;