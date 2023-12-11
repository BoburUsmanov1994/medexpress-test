import React, {useState} from 'react';
import Title from "../../../components/title";
import GridView from "../../../containers/grid-view";
import {KEYS} from "../../../constants/keys";
import {URLS} from "../../../constants/urls";
import {get, isEmpty, isNil} from "lodash"
import downloadIcon from "../../../assets/icons/download.svg"
import {useNavigate, useSearchParams} from 'react-router-dom'
import {useTranslation} from "react-i18next";
import {Plus} from "react-feather";
import Search from "../../../components/search"
import SelectComponent from "../../../components/select";
import Badge from "../../../components/badge"
import {ContentLoader} from "../../../components/loader";
import {Tab, Tabs} from "../../../components/tab";
import Form from "../../../containers/form";
import Field from "../../../containers/form/field";
import orgIcon from "../../../assets/icons/org.svg";
import Locations from "../../../components/locations";
import Contacts from "../../../components/contacts";
import Dropzone from "../../../containers/form/components/Dropzone";
import Modal from "../../../components/modal";
import {usePostQuery} from "../../../hooks/api";
import ReactJson from "react-json-view";


const PatientsContainer = () => {
    const navigate = useNavigate();
    const [_, setSearchParams] = useSearchParams();
    const [filter, setFilter] = useState({name: ''})
    const [open, setOpen] = useState(false);
    const [personData, setPersonData] = useState(null)
    const {t} = useTranslation();
    const {
        mutate: getPersonInfo, isLoading: isLoadingPersonInfo
    } = usePostQuery({listKeyId: KEYS.persons})
    const {
        mutate: addRequest, isLoading: isLoadingPost
    } = usePostQuery({listKeyId: KEYS.practitioners})

    const columns = [
        {
            title: t('НАИМЕНОВАНИЕ'),
            key: 'display',
        },
        {
            title: t('РОДИТЕЛЬСКАЯ ОРГАНИЗАЦИЯ'),
            key: 'parent.display',
        },
        {
            title: t('ТИП ОРГАНИЗАЦИИ'),
            key: 'medical_type.display',
        },
        {
            title: t('УРОВЕНЬ'),
            key: 'level.display',
        },
        {
            title: t('СТАТУС'),
            key: 'active',
            render: ({value}) => <Badge
                status={value ? 'success' : 'error'}>{value ? t('Активный') : t('Неактивный')}</Badge>
        }
    ]

    const closeModal = () => {
        setOpen(false)
        setPersonData({})
        setSearchParams(``)
    }

    const onSubmit = ({data}, tab) => {
        if (tab === 'person') {
            const {contacts, ...rest} = data;
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
        } else {
            setPersonData(prev => ({...prev, ...data}))
        }
        setSearchParams(`tab=${tab}`)
    }

    const add = () => {
        const {...rest} = personData;
        addRequest({
            url: URLS.organizations,
            attributes: {
                ...rest,
            }
        }, {
            onSuccess: () => {
                closeModal();
            }
        })
    }
    const addPatient = () => {
        const {id, ...rest} = personData;
        addRequest({
            url: URLS.practitioners,
            attributes: {
                ...rest,
                person_id: id
            }
        }, {
            onSuccess: () => {
                closeModal();
            }
        })
    }
    console.log('personData', personData)
    return (
        <div>
            <div className="grid grid-cols-12 items-center">
                <div className="col-span-6">
                    <Title>{t("Пациенты")}</Title>
                </div>
                <div className="col-span-6 flex items-center justify-end">
                    <button
                        onClick={() => setOpen(true)}
                        className={'inline-flex py-2.5 pl-2.5 pr-5 rounded-lg bg-primary items-center text-white font-semibold text-center mr-4'}>
                        <Plus className={'mr-1.5'}/>
                        {t('Добавить пациента')}
                    </button>
                    <button
                        className={'inline-flex items-center py-2.5 pl-2.5 pr-5 text-sm font-bold text-primary border border-primary rounded-lg'}>
                        <img className={'mr-2.5'} src={downloadIcon} alt={'export'}/>
                        {t("Export")}
                    </button>
                </div>
                <div className="col-span-4 mt-5">
                    <Search handleSearch={(val) => setFilter(prev => ({...prev, name: val}))}/>
                </div>
                <div className="col-span-8 mt-5 flex justify-end">
                    <div className="mr-6">
                        <SelectComponent
                            // setValue={(val) => setFilter(prev => ({...prev, city_id: val}))}
                            // value={get(filter, 'city_id')}
                            options={[]}
                            label={t('Район')}/>
                    </div>
                </div>
                <div className="col-span-12 mt-6">
                    <GridView
                        params={{
                        }}
                        hasActionColumn
                        listKey={KEYS.patients} url={URLS.patients}
                        columns={columns}/>
                </div>
            </div>
            <Modal open={open} onClose={closeModal} classNames={'!w-[1080px] !pb-0'}
                   title={t('Добавить пациента')}>
                {(isLoadingPost || isLoadingPersonInfo) && <ContentLoader/>}
                <Tabs isLabelDisabled>
                    <Tab tab={'person'} label={t('Личный документ')}>
                        <Form defaultValues={{...personData}} classNames={'grid grid-cols-12 gap-x-6'}
                              formRequest={(data) => onSubmit(data, 'info')}
                              footer={<div className={'col-span-12 '}>
                                  <div className="flex justify-end">
                                          <button onClose={closeModal} type={'button'}
                                                  className={'text-[#7A7A7A] border-2 border-[#7A7A7A] py-3 px-6 rounded-lg mr-4 inline-block   font-bold text-center  mt-6'}>
                                              {t('Назад')}
                                          </button>
                                          <button type={'submit'}
                                                  className={' py-3 px-6 rounded-lg bg-primary inline-block  text-white font-bold text-center  mt-6'}>
                                              {t('Следующий шаг')}
                                          </button>
                                  </div>
                              </div>}>
                            <Field type={'input-mask'}
                                   params={{
                                       required: true,
                                       pattern: {value: /^[A-Z a-z]{2}[0-9]{7}$/, message: 'Invalid value'}
                                   }}
                                   classNames={'col-span-6'}
                                   name={'passport'}
                                   defaultValue={get(personData, 'passport')}
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
                                   classNames={'col-span-6'}
                                   name={'pin'}
                                   defaultValue={get(personData, 'pin')}
                                   property={{
                                       placeholder: t('ПИНФЛ'),
                                       mask: '99999999999999',
                                       maskChar: '_',
                                   }}
                                   label={<div className={'flex'}><span>{t('ПИНФЛ')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                            />
                            {/*<div className="col-span-12">*/}
                            {/*    {!isEmpty(personData) && !isNil(personData) && <ReactJson src={personData}/>}*/}
                            {/*</div>*/}
                        </Form>

                    </Tab>
                    <Tab tab={'info'} label={t('Основные данные')}>
                        <Form classNames={'grid grid-cols-12 gap-x-6'} formRequest={(data) => onSubmit(data, 'address')}
                              footer={<div className={'col-span-12 '}>
                                  <div className="flex justify-end">
                                      <button onClick={() => setSearchParams(`tab=person`)} type={'button'}
                                              className={'text-[#7A7A7A] border-2 border-[#7A7A7A] py-3 px-6 rounded-lg mr-4 inline-block   font-bold text-center  mt-6'}>
                                          {t('Назад')}
                                      </button>
                                      <button type={'submit'}
                                              className={' py-3 px-6 rounded-lg bg-primary inline-block  text-white font-bold text-center  mt-6'}>
                                          {t('Следующий шаг')}
                                      </button>
                                  </div>
                              </div>}>
                            <Locations data={personData}/>
                        </Form>
                    </Tab>
                    <Tab tab={'address'} label={t('Адрес')}>
                        <Form classNames={'grid grid-cols-12 gap-x-6'}
                              formRequest={(data) => onSubmit(data, 'contacts')}
                              footer={<div className={'col-span-12 '}>
                                  <div className="flex justify-end">
                                      <button onClick={() => setSearchParams(`tab=name`)} type={'button'}
                                              className={'text-[#7A7A7A] border-2 border-[#7A7A7A] py-3 px-6 rounded-lg mr-4 inline-block   font-bold text-center  mt-6'}>
                                          {t('Назад')}
                                      </button>
                                      <button type={'submit'}
                                              className={' py-3 px-6 rounded-lg bg-primary inline-block  text-white font-bold text-center  mt-6'}>
                                          {t('Следующий шаг')}
                                      </button>
                                  </div>
                              </div>}>
                            <Locations data={personData}/>
                        </Form>
                    </Tab>

                    <Tab tab={'contact'} label={t('Контакты')}>
                        <Form classNames={'grid grid-cols-12 gap-x-6'} formRequest={(data) => onSubmit(data, 'photo')}
                              footer={<div className={'col-span-12 '}>
                                  <div className="flex justify-end">
                                      <button onClick={() => setSearchParams(`tab=region`)} type={'button'}
                                              className={'text-[#7A7A7A] border-2 border-[#7A7A7A] py-3 px-6 rounded-lg mr-4 inline-block   font-bold text-center  mt-6'}>
                                          {t('Назад')}
                                      </button>
                                      <button type={'submit'}
                                              className={' py-3 px-6 rounded-lg bg-primary inline-block  text-white font-bold text-center  mt-6'}>
                                          {t('Следующий шаг')}
                                      </button>
                                  </div>
                              </div>}>
                            <Contacts data={personData}/>
                        </Form>
                    </Tab>
                    <Tab tab={'photo'} label={t('Изображение')}>
                        <Dropzone/>
                        <div className={'col-span-12 '}>
                            <div className="flex justify-end">
                                <button onClick={() => setSearchParams(`tab=contact`)} type={'button'}
                                        className={'text-[#7A7A7A] border-2 border-[#7A7A7A] py-3 px-6 rounded-lg mr-4 inline-block   font-bold text-center  mt-6'}>
                                    {t('Назад')}
                                </button>
                                <button onClick={add} type={'submit'}
                                        className={'py-3 px-6 rounded-lg bg-primary inline-block  text-white font-bold text-center  mt-6'}>
                                    {t('Сохранить')}
                                </button>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </Modal>
        </div>
    );
};

export default PatientsContainer;