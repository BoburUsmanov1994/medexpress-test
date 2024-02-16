import React, {useEffect, useState} from 'react';
import Title from "../../../components/title";
import {useTranslation} from "react-i18next";
import {Link, useNavigate} from "react-router-dom";
import {ChevronLeft} from "react-feather";
import Content from "../../../components/content";
import Form from "../../../containers/form";
import Field from "../../../containers/form/field";
import orgIcon from "../../../assets/icons/org.svg";
import {get, head, isEmpty} from "lodash";
import {KEYS} from "../../../constants/keys";
import {useGetOneQuery, usePutQuery} from "../../../hooks/api";
import {URLS} from "../../../constants/urls";
import {ContentLoader, OverlayLoader} from "../../../components/loader";
import Locations from "../../../components/locations";
import Identifiers from "../../../components/identifiers";
import PatientContacts from "../../../components/contacts/patient-contacts";

const PatientUpdateContainer = ({id}) => {
    const {t} = useTranslation();
    const navigate = useNavigate()
    const {data, isLoading} = useGetOneQuery({id: id, url: URLS.patients, key: [KEYS.patients, id]})
    const {
        mutate: updatePatientRequest, isLoading: isLoadingPatient
    } = usePutQuery({listKeyId: KEYS.patients})
    const updatePatient = ({data: formData}) => {
        const {id: formId, ...rest} = formData
        updatePatientRequest({
            url: `${URLS.patients}/${id}`,
            attributes: {
                ...rest,
                // pin: get(head((get(get(data, 'data.payload.patient'), 'identifiers', []))), 'value')
            }
        }, {
            onSuccess: () => {
                navigate('/patient')
            }
        })
    }
    if (isLoading) {
        return <OverlayLoader/>
    }
    return (<>
            <div className="grid grid-cols-12">
                <div className="col-span-12 mb-5">
                    <Link className={'text-primary  font-bold inline-flex items-center'}
                          to={'/patient'}><ChevronLeft className={'mr-1'}/>{t("Назад к списку")}</Link>
                </div>
                <div className="col-span-12 mb-4">
                    <Title>{t("Обновить информацию о пациенте")}</Title>
                </div>
                <div className="col-span-12">
                    {(isLoadingPatient) && <ContentLoader/>}
                    <Content sm>

                        <Form defaultValues={{
                            ...get(data, 'data.payload.patient'),
                            telecoms: isEmpty(get(data, 'data.payload.patient.telecoms', [])) ? [{}] : [{}]
                        }} formRequest={(data) => updatePatient(data)}
                              name={'patientForm'}
                              classNames={'grid grid-cols-12 gap-x-6 mt-3'} footer={<div className={'col-span-12 '}>
                            <div className="flex">
                                <button type={'submit'}
                                        className={' py-3 px-6 rounded-lg bg-primary inline-block  text-white font-bold text-center  mt-6'}>
                                    {t('Сохранить')}
                                </button>
                            </div>
                        </div>}>
                            <div className="col-span-12">
                                <Title sm className={'mb-3'}>{t("Удостоверяющий личность документ")}</Title>
                            </div>
                            <Identifiers/>
                            <div className="col-span-12">
                                <Title sm className={'mb-3'}>{t("Основные данные")}</Title>
                            </div>
                            <Field type={'input'} params={{
                                required: true,
                            }}
                                   defaultValue={get(get(data, 'data.payload.patient'), 'display_first_name')}
                                   classNames={'col-span-4'}
                                   name={'display_first_name'}
                                   placeholder={t('Имя')}
                                   property={{type: 'text'}}
                                   label={<div className={'flex'}><span>{t('Имя')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                            />
                            <Field type={'input'} params={{
                                required: true,
                            }}
                                   defaultValue={get(get(data, 'data.payload.patient'), 'display_last_name')}
                                   classNames={'col-span-4'}
                                   name={'display_last_name'}
                                   placeholder={t('Фамилия')}
                                   property={{type: 'text'}}
                                   label={<div className={'flex'}><span>{t('Фамилия')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                            />
                            <Field type={'input'} params={{
                                required: true,
                            }}
                                   defaultValue={get(get(data, 'data.payload.patient'), 'display_middle_name')}
                                   classNames={'col-span-4'}
                                   name={'display_middle_name'}
                                   placeholder={t('Отчество')}
                                   property={{type: 'text'}}
                                   label={<div className={'flex'}><span>{t('Отчество')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                            />
                            <Field type={'async-select'}
                                   defaultValue={get(get(data, 'data.payload.patient'), 'nationality')}
                                   isDisabledSearch
                                   url={URLS.nationality}
                                   keyId={KEYS.nationality}
                                   classNames={'col-span-4'}
                                   name={'nationality'}
                                   limit={1000}
                                   label={<div className={'flex'}><span>{t('Национальность')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                                   params={{required: true}}
                            />
                            <Field type={'async-select'}
                                   defaultValue={get(get(data, 'data.payload.patient'), 'citizenship')}
                                   isDisabledSearch
                                   url={URLS.citizenship}
                                   keyId={KEYS.citizenship}
                                   classNames={'col-span-4'}
                                   name={'citizenship'}
                                   limit={1000}
                                   label={<div className={'flex'}><span>{t('Гражданство')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                                   params={{required: true}}
                            />
                            <Field type={'async-select'}
                                   defaultValue={get(get(data, 'data.payload.patient'), 'birth_country')}
                                   isDisabledSearch
                                   url={URLS.citizenship}
                                   keyId={KEYS.citizenship}
                                   classNames={'col-span-4'}
                                   name={'birth_country'}
                                   limit={1000}
                                   label={<div className={'flex'}><span>{t('Страна рождения')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                                   params={{required: true}}
                            />
                            <Field type={'datepicker'}
                                   dateFormat={"yyyy-MM-dd"}
                                   params={{
                                       required: true,
                                   }}
                                   defaultValue={get(get(data, 'data.payload.patient'), 'birth_date')}
                                   classNames={'col-span-2'}
                                   name={'birth_date'}
                                   placeholder={t('Дата рождения')}
                                   label={<div className={'flex'}><span>{t('Дата рождения')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                            />
                            <Field type={'input'}
                                   defaultValue={get(get(data, 'data.payload.patient'), 'birth_place')}
                                   classNames={'col-span-10'}
                                   name={'birth_place'}
                                   placeholder={t('Место рождения')}
                                   property={{type: 'text'}}
                                   label={t('Место рождения')}
                            />
                            <Field type={'async-select'}
                                   defaultValue={get(get(data, 'data.payload.patient'), 'gender')}
                                   isDisabledSearch
                                   url={URLS.gender}
                                   keyId={KEYS.gender}
                                   classNames={'col-span-4'}
                                   name={'gender'}
                                   limit={1000}
                                   label={<div className={'flex'}><span>{t('Пол')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                                   params={{required: true}}
                            />
                            <div className={'col-span-12'}>
                                <hr className={'my-4'}/>
                            </div>
                            <div className="col-span-12">
                                <Title sm className={'mb-3'}>{t("Адрес")}</Title>
                            </div>
                            <Locations dataKey={'addresses'} data={get(data, 'data.payload.patient')}
                                       name={'addresses'}/>
                            <div className={'col-span-12'}>
                                <hr className={'my-4'}/>
                            </div>
                            <div className="col-span-12">
                                <Title sm className={'mb-3'}>{t("Контакты")}</Title>
                            </div>
                            <PatientContacts hasSubtitle={false} data={{...get(data, 'data.payload.patient')}}/>
                        </Form>
                    </Content>
                </div>
            </div>
        </>
    );
}

export default PatientUpdateContainer;