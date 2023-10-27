import React, {useEffect, useState} from 'react';
import Title from "../../../components/title";
import GridView from "../../../containers/grid-view";
import {KEYS} from "../../../constants/keys";
import {URLS} from "../../../constants/urls";
import {get, isObject, range, isNil, isEmpty} from "lodash"
import downloadIcon from "../../../assets/icons/download.svg"
import {useNavigate, useSearchParams} from 'react-router-dom'
import {useTranslation} from "react-i18next";
import Modal from "../../../components/modal";
import {Tab, Tabs} from "../../../components/tab";
import Form from "../../../containers/form";
import orgIcon from "../../../assets/icons/org.svg"
import {Minus, Plus} from "react-feather";
import {useGetAllQuery, useGetOneQuery, usePostQuery, usePutQuery} from "../../../hooks/api";
import Search from "../../../components/search"
import SelectComponent from "../../../components/select";
import InputMaskComponent from "../../../components/input-mask";
import {ContentLoader} from "../../../components/loader";
import Field from "../../../containers/form/field";
import Dropzone from "../../../containers/form/components/Dropzone";
import Badge from "../../../components/badge"
import Names from "../../../components/names"
import Contacts from "../../../components/contacts";
import Locations from "../../../components/locations";


const OrganizationsContainer = () => {
    const navigate = useNavigate();
    const [_, setSearchParams] = useSearchParams();
    const [rowId, setRowId] = useState(null);
    const [open, setOpen] = useState(false);
    let [orgData, setOrgData] = useState({});
    const [filter, setFilter] = useState({name: '', state_id: null, city_id: null})
    const {t} = useTranslation();

    const {data: organizationTypeLevelList, isLoading: isLoadingTypeLevelList} = useGetAllQuery({
        key: KEYS.organizationTypeLevel,
        url: URLS.organizationTypeLevel,
        params: {
            params: {
                limit: 100
            }
        },
        enabled: !!(open || !isNil(rowId))
    })

    const {data: organizationTypeMedicalList, isLoading: isLoadingTypeMedicalList} = useGetAllQuery({
        key: KEYS.organizationTypeMedical,
        url: URLS.organizationTypeMedical,
        params: {
            params: {
                limit: 100
            }
        },
        enabled: !!(open || !isNil(rowId))
    })

    const {data: organizationLegalFormList, isLoading: isLoadingLegalFormList} = useGetAllQuery({
        key: KEYS.organizationLegalForm,
        url: URLS.organizationLegalForm,
        params: {
            params: {
                limit: 100
            }
        },
        enabled: !!(open || !isNil(rowId))
    })

    const {data: organizationTypeServiceList, isLoading: isLoadingTypeServiceList} = useGetAllQuery({
        key: KEYS.organizationTypeService,
        url: URLS.organizationTypeService,
        params: {
            params: {
                limit: 100
            }
        },
        enabled: !!(open || !isNil(rowId))
    })



    const {data: organizationRegions, isLoading: isLoadingRegions} = useGetAllQuery({
        key: KEYS.organizationTerritory,
        url: URLS.organizationTerritory,
        params: {
            params: {
                limit: 100,
                level: 1
            }
        }
    })


    const {data: districts} = useGetAllQuery({
        key: [KEYS.organizationTerritory, get(filter, 'state_id.value')],
        url: URLS.organizationTerritory,
        params: {
            params: {
                limit: 100,
                level: 2,
                parent_id: get(filter, 'state_id.value')
            },
        },
        enabled: !!(get(filter, 'state_id.value'))
    })


    const {data, isLoading: isLoadingOne} = useGetOneQuery({
        key: [KEYS.organizations, rowId],
        id: rowId,
        url: URLS.organizations,
        enabled: !!(rowId)
    })

    const {
        mutate: addRequest, isLoading: isLoadingPost
    } = usePostQuery({listKeyId: KEYS.organizations})
    const {
        mutate: updateRequest, isLoading: isLoadingPut
    } = usePutQuery({listKeyId: KEYS.organizations})

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

    const onSubmit = ({data}, tab) => {
        setOrgData(prev => ({...prev, ...data}))
        setSearchParams(`tab=${tab}`)
    }

    const add = () => {
        const {longitude, latitude, management_form, ...rest} = orgData;
        if (rowId) {
            updateRequest({
                url: `${URLS.organizations}/${rowId}`,
                attributes: {
                    ...rest,
                    display: get(orgData, 'names[0].value'),
                    locations: [{
                        address: get(orgData, 'locations[0].address'),
                        longitude: parseFloat(longitude) || undefined,
                        latitude: parseFloat(latitude) || undefined
                    }]
                }
            }, {
                onSuccess: () => {
                    closeModal();
                }
            })
        } else {
            addRequest({
                url: URLS.organizations,
                attributes: {
                    ...rest,
                    display: get(orgData, 'names[0].value'),
                    locations: [{
                        address: get(orgData, 'locations[0].address'),
                        longitude: parseFloat(longitude) || undefined,
                        latitude: parseFloat(latitude) || undefined
                    }]
                }
            }, {
                onSuccess: () => {
                    closeModal();
                }
            })
        }
    }

    const closeModal = () => {
        setRowId(null);
        setOpen(false)
        setOrgData({})
        setSearchParams(``)
    }

    useEffect(() => {
        if (get(data, 'data') && rowId) {
            setOrgData(get(data, 'data'))
        }
    }, [data, rowId])


    return (
        <div>
            <div className="grid grid-cols-12 items-center">
                <div className="col-span-6">
                    <Title>{t("Организации")}</Title>
                </div>
                <div className="col-span-6 flex items-center justify-end">
                    <button
                        onClick={() => setOpen(true)}
                        className={'inline-flex py-2.5 pl-2.5 pr-5 rounded-lg bg-primary items-center text-white font-semibold text-center mr-4'}>
                        <Plus className={'mr-1.5'}/>
                        {t('Добавить организацию')}
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
                    <div className="mr-6"><SelectComponent
                        isLoading={isLoadingRegions}
                        value={get(filter, 'state_id')}
                        setValue={(val) => setFilter(prev => ({...prev, state_id: val}))}
                        label={t('Регион')} options={get(organizationRegions, 'data', []).map(_option => ({
                        value: get(_option, 'id'),
                        label: get(_option, 'display')
                    }))}/></div>
                    <div className="mr-6">
                        <SelectComponent
                            setValue={(val) => setFilter(prev => ({...prev, city_id: val}))}
                            value={get(filter, 'city_id')}
                            options={get(districts, 'data', []).map(_option => ({
                                value: get(_option, 'id'),
                                label: get(_option, 'display')
                            }))}
                            label={t('Район')}/>
                    </div>
                    <InputMaskComponent mask={'999999999'} label={'ИНН'}/>
                </div>
                <div className="col-span-12 mt-6">
                    <GridView
                        getRowId={setRowId}
                        onRowClick={({id}) => navigate(`/hrm/organization/${id}`)}
                        params={{
                            name: get(filter, 'name'),
                            state_id: get(filter, 'state_id.value'),
                            city_id: get(filter, 'city_id.value')
                        }}
                        hasActionColumn
                        listKey={KEYS.organizations} url={URLS.organizations}
                        columns={columns}/>
                </div>
            </div>
            <Modal open={open} onClose={closeModal} classNames={'!w-[1080px] !pb-0'}
                   title={t('Добавление организации')}>
                {(isLoadingPost) && <ContentLoader/>}
                <Tabs isLabelDisabled>
                    <Tab tab={'info'} label={t('Информация')}>
                        <Form defaultValues={{...orgData}} classNames={'grid grid-cols-12 gap-x-6'}
                              formRequest={(data) => onSubmit(data, 'name')}
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
                                   params={{required: true, pattern: {value: /^[0-9]{9}$/, message: 'Invalid value'}}}
                                   classNames={'col-span-6'}
                                   name={'tin'}
                                   defaultValue={get(orgData, 'tin')}
                                   property={{
                                       placeholder: t('Введите ИНН организации'),
                                       mask: '999999999',
                                       maskChar: '_'
                                   }}
                                   label={<div className={'flex'}><span>{t('ИНН организации')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                            />
                            <Field type={'async-select'} isDisabledSearch url={URLS.organizationsListForSelect}
                                   keyId={KEYS.organizationsListForSelect}
                                   classNames={'col-span-6'}
                                   name={'parent'}
                                   defaultValue={get(orgData, 'parent')}
                                   label={t('Родительская организация')}
                            />
                            <Field type={'select'} isLoading={isLoadingTypeLevelList}
                                   defaultValue={get(orgData, 'level')}
                                   classNames={'col-span-6'} name={'level'}
                                   label={<div className={'flex'}><span>{t('Уровень оказания услуг')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>} params={{required: true}}
                                   options={get(organizationTypeLevelList, 'data', [])}/>
                            <Field type={'select'} isLoading={isLoadingTypeMedicalList}
                                   defaultValue={get(orgData, 'medical_type')}
                                   classNames={'col-span-6'}
                                   name={'medical_type'}
                                   label={<div className={'flex'}><span>{t('Тип организации')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                                   params={{required: true}}
                                   options={get(organizationTypeMedicalList, 'data', [])}/>
                            <Field type={'select'} isLoading={isLoadingLegalFormList}
                                   defaultValue={get(orgData, 'legal_form')}
                                   classNames={'col-span-6'}
                                   name={'legal_form'}
                                   label={t('Организационно-правовая форма')}
                                   options={get(organizationLegalFormList, 'data', [])}/>
                            <Field type={'select'} isLoading={isLoadingTypeServiceList}
                                   defaultValue={get(orgData, 'service_types')}
                                   classNames={'col-span-6'}
                                   name={'service_types'}
                                   label={t('Виды оказания услуг')}
                                   isMulti
                                   options={get(organizationTypeServiceList, 'data', [])}/>
                            <Field type={'async-select'} defaultValue={get(orgData, 'affiliation')}
                                   classNames={'col-span-6'}
                                   keyId={KEYS.organizationManagementForm}
                                   url={URLS.organizationManagementForm}
                                   name={'affiliation'}
                                   label={t('Орган государственного управления')}
                            />


                        </Form>
                    </Tab>
                    <Tab tab={'name'} label={t('Наименование')}>
                        <Form classNames={'grid grid-cols-12 gap-x-6'} formRequest={(data) => onSubmit(data, 'address')}
                              footer={<div className={'col-span-12 '}>
                                  <div className="flex justify-end">
                                      <button onClick={() => setSearchParams(`tab=info`)} type={'button'}
                                              className={'text-[#7A7A7A] border-2 border-[#7A7A7A] py-3 px-6 rounded-lg mr-4 inline-block   font-bold text-center  mt-6'}>
                                          {t('Назад')}
                                      </button>
                                      <button type={'submit'}
                                              className={' py-3 px-6 rounded-lg bg-primary inline-block  text-white font-bold text-center  mt-6'}>
                                          {t('Следующий шаг')}
                                      </button>
                                  </div>
                              </div>}>
                            <Names data={orgData}/>

                        </Form>
                    </Tab>
                    <Tab tab={'address'} label={t('Адрес')}>
                        <Form classNames={'grid grid-cols-12 gap-x-6'} formRequest={(data) => onSubmit(data, 'region')}
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
                            <Locations data={orgData} />

                        </Form>
                    </Tab>
                    <Tab tab={'region'} label={t('Регион обслуживания')}>
                        <Form classNames={'grid grid-cols-12 gap-x-6'} formRequest={(data) => onSubmit(data, 'contact')}
                              footer={<div className={'col-span-12 '}>
                                  <div className="flex justify-end">
                                      <button onClick={() => setSearchParams(`tab=address`)} type={'button'}
                                              className={'text-[#7A7A7A] border-2 border-[#7A7A7A] py-3 px-6 rounded-lg mr-4 inline-block   font-bold text-center  mt-6'}>
                                          {t('Назад')}
                                      </button>
                                      <button type={'submit'}
                                              className={' py-3 px-6 rounded-lg bg-primary inline-block  text-white font-bold text-center  mt-6'}>
                                          {t('Следующий шаг')}
                                      </button>
                                  </div>
                              </div>}>

                            <Field type={'select'} defaultValue={get(orgData, 'service_area[0].state')}
                                   classNames={'col-span-6'}
                                   name={'service_area[0].state'}
                                   label={<div className={'flex'}><span>{t('Регион')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                                   params={{required: true}}
                                   options={get(organizationRegions, 'data', [])}/>

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

                            <Contacts data={orgData}/>

                            <h3 className={'mb-6 col-span-12 font-semibold'}>Географические координаты</h3>
                            <Field type={'input'} params={{
                                pattern: {
                                    value: /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/,
                                    message: 'Invalid format'
                                }
                            }} defaultValue={get(orgData, 'latitude', null)}
                                   classNames={'col-span-4'}
                                   name={`latitude`}
                                   placeholder={t('Широта')}
                                   label={t('Широта')}
                            />
                            <Field type={'input'} params={{
                                pattern: {
                                    value: /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/,
                                    message: 'Invalid format'
                                }
                            }} defaultValue={get(orgData, 'longitude', null)}
                                   classNames={'col-span-4'}
                                   name={`longitude`}
                                   placeholder={t('Долгота')}
                                   label={t('Долгота')}
                            />

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

            <Modal open={!isNil(rowId)} onClose={closeModal} classNames={'!w-[1080px] !pb-0'}
                   title={t('Обновить организацию')}>
                {(isLoadingPut) && <ContentLoader/>}
                {(isLoadingOne) && <div className={'py-10'}><ContentLoader/></div>}
                {!isEmpty(orgData) && <Tabs isLabelDisabled>
                    <Tab tab={'info'} label={t('Информация')}>
                        <Form classNames={'grid grid-cols-12 gap-x-6'} formRequest={(data) => onSubmit(data, 'name')}
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
                                   params={{required: true, pattern: {value: /^[0-9]{9}$/, message: 'Invalid value'}}}
                                   classNames={'col-span-6'}
                                   name={'tin'}
                                   defaultValue={get(orgData, 'tin')}
                                   property={{
                                       placeholder: t('Введите ИНН организации'),
                                       mask: '999999999',
                                       maskChar: '_'
                                   }}
                                   label={<div className={'flex'}><span>{t('ИНН организации')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                            />
                            <Field type={'async-select'} isDisabledSearch url={URLS.organizationsListForSelect}
                                   keyId={KEYS.organizationsListForSelect}
                                   classNames={'col-span-6'}
                                   name={'parent'}
                                   defaultValue={get(orgData, 'parent')}
                                   label={t('Родительская организация')}
                            />
                            <Field type={'select'} isLoading={isLoadingTypeLevelList}
                                   defaultValue={get(orgData, 'level')}
                                   classNames={'col-span-6'} name={'level'}
                                   label={<div className={'flex'}><span>{t('Уровень оказания услуг')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>} params={{required: true}}
                                   options={get(organizationTypeLevelList, 'data', [])}/>
                            <Field type={'select'} isLoading={isLoadingTypeMedicalList}
                                   defaultValue={get(orgData, 'medical_type')}
                                   classNames={'col-span-6'}
                                   name={'medical_type'}
                                   label={<div className={'flex'}><span>{t('Тип организации')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                                   params={{required: true}}
                                   options={get(organizationTypeMedicalList, 'data', [])}/>
                            <Field type={'select'} isLoading={isLoadingLegalFormList}
                                   defaultValue={get(orgData, 'legal_form')}
                                   classNames={'col-span-6'}
                                   name={'legal_form'}
                                   label={t('Организационно-правовая форма')}
                                   options={get(organizationLegalFormList, 'data', [])}/>
                            <Field type={'select'} isLoading={isLoadingTypeServiceList}
                                   defaultValue={get(orgData, 'service_types')}
                                   classNames={'col-span-6'}
                                   name={'service_types'}
                                   label={t('Виды оказания услуг')}
                                   isMulti
                                   options={get(organizationTypeServiceList, 'data', [])}/>
                            <Field type={'async-select'} defaultValue={get(orgData, 'affiliation')}
                                   classNames={'col-span-6'}
                                   keyId={KEYS.organizationManagementForm}
                                   url={URLS.organizationManagementForm}
                                   name={'affiliation'}
                                   label={t('Орган государственного управления')}
                            />


                        </Form>
                    </Tab>
                    <Tab tab={'name'} label={t('Наименование')}>
                        <Form classNames={'grid grid-cols-12 gap-x-6'} formRequest={(data) => onSubmit(data, 'address')}
                              footer={<div className={'col-span-12 '}>
                                  <div className="flex justify-end">
                                      <button onClick={() => setSearchParams(`tab=info`)} type={'button'}
                                              className={'text-[#7A7A7A] border-2 border-[#7A7A7A] py-3 px-6 rounded-lg mr-4 inline-block   font-bold text-center  mt-6'}>
                                          {t('Назад')}
                                      </button>
                                      <button type={'submit'}
                                              className={' py-3 px-6 rounded-lg bg-primary inline-block  text-white font-bold text-center  mt-6'}>
                                          {t('Следующий шаг')}
                                      </button>
                                  </div>
                              </div>}>

                            <Names data={orgData}/>

                        </Form>
                    </Tab>
                    <Tab tab={'address'} label={t('Адрес')}>
                        <Form classNames={'grid grid-cols-12 gap-x-6'} formRequest={(data) => onSubmit(data, 'region')}
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
                            <Locations data={orgData} />

                        </Form>
                    </Tab>
                    <Tab tab={'region'} label={t('Регион обслуживания')}>
                        <Form classNames={'grid grid-cols-12 gap-x-6'} formRequest={(data) => onSubmit(data, 'contact')}
                              footer={<div className={'col-span-12 '}>
                                  <div className="flex justify-end">
                                      <button onClick={() => setSearchParams(`tab=address`)} type={'button'}
                                              className={'text-[#7A7A7A] border-2 border-[#7A7A7A] py-3 px-6 rounded-lg mr-4 inline-block   font-bold text-center  mt-6'}>
                                          {t('Назад')}
                                      </button>
                                      <button type={'submit'}
                                              className={' py-3 px-6 rounded-lg bg-primary inline-block  text-white font-bold text-center  mt-6'}>
                                          {t('Следующий шаг')}
                                      </button>
                                  </div>
                              </div>}>

                            <Field type={'select'} defaultValue={get(orgData, 'service_area[0].state')}
                                   classNames={'col-span-6'}
                                   name={'service_area[0].state'}
                                   label={<div className={'flex'}><span>{t('Регион')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                                   params={{required: true}}
                                   options={get(organizationRegions, 'data', [])}/>

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

                            <h3 className={'mb-6 col-span-12 font-semibold'}>Географические координаты</h3>
                            <Field type={'input'} params={{
                                pattern: {
                                    value: /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/,
                                    message: 'Invalid format'
                                }
                            }} defaultValue={get(orgData, 'latitude', null)}
                                   classNames={'col-span-4'}
                                   name={`latitude`}
                                   placeholder={t('Широта')}
                                   label={t('Широта')}
                            />
                            <Field type={'input'} params={{
                                pattern: {
                                    value: /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/,
                                    message: 'Invalid format'
                                }
                            }} defaultValue={get(orgData, 'longitude', null)}
                                   classNames={'col-span-4'}
                                   name={`longitude`}
                                   placeholder={t('Долгота')}
                                   label={t('Долгота')}
                            />

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
                </Tabs>}
            </Modal>
        </div>
    );
};

export default OrganizationsContainer;