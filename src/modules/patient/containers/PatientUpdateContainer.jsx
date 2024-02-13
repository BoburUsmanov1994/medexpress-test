import React, {useEffect, useState} from 'react';
import Title from "../../../components/title";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {ChevronLeft} from "react-feather";
import Content from "../../../components/content";
import Form from "../../../containers/form";
import Field from "../../../containers/form/field";
import orgIcon from "../../../assets/icons/org.svg";
import {find, get, head, isEqual, isNil} from "lodash";
import {KEYS} from "../../../constants/keys";
import {useGetOneQuery, usePostQuery} from "../../../hooks/api";
import {URLS} from "../../../constants/urls";
import {ContentLoader, OverlayLoader} from "../../../components/loader";
import Locations from "../../../components/locations";
import Contacts from "../../../components/contacts";

const PatientUpdateContainer = ({id}) => {
    const {t} = useTranslation();
    const [personData, setPersonData] = useState(null);
    const {data,isLoading} = useGetOneQuery({id:id,url:URLS.patients,key:[KEYS.patients,id]})
    const {
        mutate: getPersonInfo, isLoading: isLoadingPersonInfo
    } = usePostQuery({listKeyId: KEYS.persons})
    const {
        mutate: addPatientRequest, isLoading: isLoadingPatient
    } = usePostQuery({listKeyId: KEYS.patients})
    const addPerson = ({data: attrs}) => {
        setPersonData(null)
        const {contacts, ...rest} = attrs;
        getPersonInfo({
            url: URLS.persons,
            attributes: {
                ...rest
            }
        }, {
            onSuccess: (response) => {
                setPersonData(prev => ({...prev, ...get(response, 'data.payload.person')}))
            }
        })
    }
    const addPatient = ({data:formData}) => {
        addPatientRequest({
            url: URLS.patients,
            attributes: {
                ...formData,
                person_id: get(personData,'id'),
                pin:get(head((get(personData,'identifiers',[]))),'value')
            }
        }, {
            onSuccess: () => {

            }
        })
    }
    useEffect(() => {
        if(isNil(personData)){
            setPersonData(get(data,'data.payload.patient'))
        }
    }, [get(data,'data.payload.patient')]);
    if(isLoading){
        return <OverlayLoader />
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
                    {(isLoadingPersonInfo || isLoadingPatient) && <ContentLoader/>}
                    <Content sm>
                        <div className="col-span-12">
                            <Title  sm className={'mb-3'}>{t("Удостоверяющий личность документ")}</Title>
                        </div>
                        <Form name={'personForm'} classNames={'grid grid-cols-12 gap-x-6'}
                              formRequest={(data) => addPerson(data)}
                              footer={null}>
                            <Field type={'input-mask'}
                                   params={{
                                       required: true,
                                       pattern: {value: /^[A-Z a-z]{2}[0-9]{7}$/, message: 'Invalid value'}
                                   }}
                                   classNames={'col-span-4'}
                                   name={'passport'}
                                   defaultValue={get(personData, 'passport',get(data,'data.payload.patient.passport'))}
                                   property={{
                                       placeholder: t('Серия и номер паспорта'),
                                       mask: 'aa9999999',
                                       maskChar: '_',
                                       className: 'uppercase'
                                   }}
                                   label={<div className={'flex'}><span>{t('Серия и номер паспорта')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                            />
                            <Field type={'input-mask'}
                                   params={{required: true, pattern: {value: /^[0-9]{14}$/, message: 'Invalid value'}}}
                                   classNames={'col-span-4'}
                                   name={'pin'}
                                   defaultValue={get(personData, 'pin',get(data,'data.payload.patient.pin'))}
                                   property={{
                                       placeholder: t('ПИНФЛ'),
                                       mask: '99999999999999',
                                       maskChar: '_',
                                   }}
                                   label={<div className={'flex'}><span>{t('ПИНФЛ')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                            />
                            <div className="col-span-4">
                                <button type={'submit'}
                                        className={' py-3 px-6 rounded-lg bg-primary inline-block  text-white font-bold text-center mt-7'}>
                                    {t('Поиск')}
                                </button>
                            </div>
                        </Form>
                        <div className={'col-span-12'}>
                            <hr className={'my-4'}/>
                        </div>
                        {(personData)&& <Form formRequest={(data)=>addPatient(data)}  fieldArrayName={'contacts'} name={'patientForm'} classNames={'grid grid-cols-12 gap-x-6 mt-3'} footer={<div className={'col-span-12 '}>
                            <div className="flex">
                                <button type={'submit'}
                                        className={' py-3 px-6 rounded-lg bg-primary inline-block  text-white font-bold text-center  mt-6'}>
                                    {t('Сохранить')}
                                </button>
                            </div>
                        </div>}>
                            <div className="col-span-12">
                                <Title sm className={'mb-3'}>{t("Основные данные")}</Title>
                            </div>
                            <Field type={'input'} params={{
                                required: true,
                            }}
                                   defaultValue={get(personData, 'display_first_name')}
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
                                   defaultValue={get(personData, 'display_last_name')}
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
                                   defaultValue={get(personData, 'display_middle_name')}
                                   classNames={'col-span-4'}
                                   name={'display_middle_name'}
                                   placeholder={t('Отчество')}
                                   property={{type: 'text'}}
                                   label={<div className={'flex'}><span>{t('Отчество')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                            />
                            <Field type={'async-select'}
                                   defaultValue={get(personData, 'nationality')}
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
                                   defaultValue={get(personData, 'citizenship')}
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
                                   defaultValue={get(personData, 'birth_country')}
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
                                   defaultValue={get(personData, 'birth_date')}
                                   classNames={'col-span-2'}
                                   name={'birth_date'}
                                   placeholder={t('Дата рождения')}
                                   label={<div className={'flex'}><span>{t('Дата рождения')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                            />
                            <Field type={'input'}
                                   defaultValue={get(personData, 'birth_place')}
                                   classNames={'col-span-10'}
                                   name={'birth_place'}
                                   placeholder={t('Место рождения')}
                                   property={{type: 'text'}}
                                   label={t('Место рождения')}
                            />
                            <Field type={'async-select'}
                                   defaultValue={get(personData, 'gender')}
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
                            <Locations dataKey={'addresses'} data={personData} name={'addresses'}/>
                            <div className={'col-span-12'}>
                                <hr className={'my-4'}/>
                            </div>
                            <div className="col-span-12">
                                <Title sm className={'mb-3'}>{t("Контакты")}</Title>
                            </div>
                            <Contacts hasSubtitle={false} data={{...personData,contacts:[{}]}} />

                        </Form>}
                    </Content>
                </div>
            </div>
        </>
    );
}

export default PatientUpdateContainer;