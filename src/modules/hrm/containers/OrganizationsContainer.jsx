import React, {useState} from 'react';
import Title from "../../../components/title";
import GridView from "../../../containers/grid-view";
import {KEYS} from "../../../constants/keys";
import {URLS} from "../../../constants/urls";
import {get, isObject} from "lodash"
import downloadIcon from "../../../assets/icons/download.svg"
import {useNavigate, useSearchParams} from 'react-router-dom'
import {useTranslation} from "react-i18next";
import Modal from "../../../components/modal";
import {Tab, Tabs} from "../../../components/tab";
import Form from "../../../containers/form";
import {InputMask, Select, PhoneNumber, Input, AsyncSelect} from "../../../containers/form/components";
import orgIcon from "../../../assets/icons/org.svg"
import {Minus, Plus} from "react-feather";
import {useGetAllQuery, usePostQuery} from "../../../hooks/api";
import clsx from "clsx";
import Search from "../../../components/search"
import SelectComponent from "../../../components/select";
import InputMaskComponent from "../../../components/input-mask";
import fileUploadImg from "../../../assets/images/fileUpload.png"
import {ContentLoader} from "../../../components/loader";


const OrganizationsContainer = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [open, setOpen] = useState(false);
    let [lang, setLang] = useState('uz');
    let [orgData, setOrgData] = useState({});
    let [regionId, setRegionId] = useState(null);
    let [districtId, setDistrictId] = useState(null);
    let [increment, setIncrement] = useState(0);
    const [filter, setFilter] = useState({name: '', state_id: null, city_id: null})
    const {t} = useTranslation();

    const {data: organizationTypeLevelList} = useGetAllQuery({
        key: KEYS.organizationTypeLevel,
        url: URLS.organizationTypeLevel,
        params: {
            params: {
                limit: 100
            }
        }
    })

    const {data: organizationTypeMedicalList} = useGetAllQuery({
        key: KEYS.organizationTypeMedical,
        url: URLS.organizationTypeMedical,
        params: {
            params: {
                limit: 100
            }
        }
    })

    const {data: organizationLegalFormList} = useGetAllQuery({
        key: KEYS.organizationLegalForm,
        url: URLS.organizationLegalForm,
        params: {
            params: {
                limit: 100
            }
        }
    })

    const {data: organizationTypeServiceList} = useGetAllQuery({
        key: KEYS.organizationTypeService,
        url: URLS.organizationTypeService,
        params: {
            params: {
                limit: 100
            }
        }
    })


    const {data: organizationCountryList} = useGetAllQuery({
        key: KEYS.organizationCountry,
        url: URLS.organizationCountry,
        params: {
            params: {
                limit: 1000
            }
        }
    })

    const {data: organizationRegions} = useGetAllQuery({
        key: KEYS.organizationTerritory,
        url: URLS.organizationTerritory,
        params: {
            params: {
                limit: 100,
                level: 1
            }
        }
    })

    const {data: organizationDistricts} = useGetAllQuery({
        key: KEYS.organizationTerritory,
        url: URLS.organizationTerritory,
        params: {
            params: {
                limit: 100,
                level: 2,
                parent_id: isObject(regionId) ? get(regionId, 'value') : regionId
            },
        },
        enabled: !!(regionId)
    })
    const {data: districts} = useGetAllQuery({
        key: KEYS.organizationTerritory,
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
    const {data: organizationNeighbors} = useGetAllQuery({
        key: KEYS.organizationTerritory,
        url: URLS.organizationTerritory,
        params: {
            params: {
                limit: 1000,
                level: 3,
                parent_id: isObject(districtId) ? get(districtId, 'value') : districtId
            },
        },
        enabled: !!(districtId)
    })

    const {
        mutate: addRequest, isLoading: isLoadingPost
    } = usePostQuery({listKeyId: KEYS.organizations})

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
        }
    ]
    const onSubmit = ({data}, tab) => {
        setOrgData(prev => ({...prev, ...data}))
        setSearchParams(`tab=${tab}`)
    }

    const add = () => {
        const {longitude,latitude,...rest} = orgData;
        addRequest({
            url: URLS.organizations,
            attributes: {...orgData,display:get(orgData,'names[0].value'),locations:[{address:get(orgData,'locations[0].address'),longitude:parseFloat(longitude),latitude:parseFloat(latitude)}]}
        }, {
            onSuccess: () => {
                closeModal();
            }
        })
    }

    const closeModal = () => {
        setOpen(false)
        setOrgData({})
        setSearchParams(``)
    }

    console.log('orgData',orgData)

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
                        onRowClick={({id})=>navigate(`/hrm/organization/${id}`)}
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
                {isLoadingPost && <ContentLoader/>}
                <Tabs isLabelDisabled>
                    <Tab tab={'info'} label={t('Информация')}>
                        <Form classNames={'grid grid-cols-12 gap-x-6'} onSubmit={(data) => onSubmit(data, 'name')}>
                            <InputMask params={{required: true}}
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
                            <AsyncSelect isDisabledSearch url={URLS.organizationsListForSelect} keyId={KEYS.organizationsListForSelect}
                                         classNames={'col-span-6'}
                                         name={'parent'}
                                         defaultValue={get(orgData, 'parent')}
                                         label={t('Родительская организация')}
                            />
                            <Select defaultValue={get(orgData, 'level')} classNames={'col-span-6'} name={'level'}
                                    label={<div className={'flex'}><span>{t('Уровень оказания услуг')}</span><img
                                        className={'ml-1'} src={orgIcon} alt="org"/></div>} params={{required: true}}
                                    options={get(organizationTypeLevelList, 'data', [])}/>
                            <Select defaultValue={get(orgData, 'medical_type')} classNames={'col-span-6'}
                                    name={'medical_type'}
                                    label={<div className={'flex'}><span>{t('Тип организации')}</span><img
                                        className={'ml-1'} src={orgIcon} alt="org"/></div>}
                                    params={{required: true}}
                                    options={get(organizationTypeMedicalList, 'data', [])}/>
                            <Select defaultValue={get(orgData, 'legal_form')} classNames={'col-span-6'}
                                    name={'legal_form'}
                                    label={t('Организационно-правовая форма')}
                                    options={get(organizationLegalFormList, 'data', [])}/>
                            <Select defaultValue={get(orgData, 'service_types')} classNames={'col-span-6'}
                                    name={'service_types'}
                                    label={t('Виды оказания услуг')}
                                    isMulti
                                    options={get(organizationTypeServiceList, 'data', [])}/>
                            <AsyncSelect defaultValue={get(orgData, 'affiliation')} classNames={'col-span-6'}
                                         keyId={KEYS.organizationManagementForm}
                                         url={URLS.organizationManagementForm}
                                         name={'affiliation'}
                                         label={t('Орган государственного управления')}
                            />

                            <div className={'col-span-12 '}>
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
                            </div>
                        </Form>
                    </Tab>
                    <Tab tab={'name'} label={t('Наименование')}>
                        <Form classNames={'grid grid-cols-12 gap-x-6'} onSubmit={(data) => onSubmit(data, 'address')}>
                            <div className={'flex col-span-12 mb-4'}>
                                <button type={'button'} onClick={() => setLang('uz')}
                                        className={clsx('py-2 px-4 border border-[#EAEFF8] rounded-lg mr-2.5 ', {'!bg-[#E5F0F3] !border-[#E5F0F3]': lang == 'uz'})}>O’zbekcha
                                </button>
                                <button type={'button'} onClick={() => setLang('ru')}
                                        className={clsx('py-2 px-4 border border-[#EAEFF8] rounded-lg mr-2.5', {'!bg-[#E5F0F3] !border-[#E5F0F3]': lang == 'ru'})}>Русский
                                </button>
                                <button type={'button'} onClick={() => setLang('en')}
                                        className={clsx('py-2 px-4 border border-[#EAEFF8] rounded-lg mr-2.5', {'!bg-[#E5F0F3] !border-[#E5F0F3]': lang == 'en'})}>English
                                </button>
                            </div>

                            <Input defaultValue={get(orgData, `names[0].value_short`)} classNames={'col-span-5'}
                                   name={`names[0].value_short`}
                                   placeholder={t('Введите краткое наименование')}
                                   property={{type: lang == 'uz' ? 'text' : 'hidden'}}
                                   label={<div className={'flex'}><span>{t('Краткое наименование')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                            />
                            <Input defaultValue={get(orgData, `names[0].value`)} classNames={'col-span-7'}
                                   name={'names[0].value'}
                                   placeholder={t('Введите полное наименование')}
                                   property={{type: lang == 'uz' ? 'text' : 'hidden'}}
                                   label={<div className={'flex'}><span>{t('Полное наименование')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                            />

                            <Input defaultValue={get(orgData, `names[1].value_short`)} classNames={'col-span-5'}
                                   name={'names[1].value_short'}
                                   property={{type: lang == 'ru' ? 'text' : 'hidden'}}
                                   placeholder={t('Введите краткое наименование')}
                                   label={<div className={'flex'}><span>{t('Краткое наименование')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                            />
                            <Input defaultValue={get(orgData, `names[1].value`)} classNames={'col-span-7'}
                                   name={'names[1].value'}
                                   property={{type: lang == 'ru' ? 'text' : 'hidden'}}
                                   placeholder={t('Введите полное наименование')}
                                   label={<div className={'flex'}><span>{t('Полное наименование')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                            />

                            <Input defaultValue={get(orgData, `names[2].value_short`)} classNames={'col-span-5'}
                                   name={'names[2].value_short'}
                                   property={{type: lang == 'en' ? 'text' : 'hidden'}}
                                   placeholder={t('Введите краткое наименование')}
                                   label={<div className={'flex'}><span>{t('Краткое наименование')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                            />
                            <Input defaultValue={get(orgData, `names[2].value`)} classNames={'col-span-7'}
                                   name={'names[2].value'}
                                   property={{type: lang == 'en' ? 'text' : 'hidden'}}
                                   placeholder={t('Введите полное наименование')}
                                   label={<div className={'flex'}><span>{t('Полное наименование')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                            />
                            <Input defaultValue={'en'} classNames={'col-span-5'} name={`names[2].locale`}
                                   placeholder={t('Введите краткое наименование')}
                                   property={{type: 'hidden'}}
                                   label={<div className={'flex'}><span>{t('Краткое наименование')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                            />
                            <Input defaultValue={'uz'} classNames={'col-span-5'} name={`names[0].locale`}
                                   placeholder={t('Введите краткое наименование')}
                                   property={{type: 'hidden'}}
                                   label={<div className={'flex'}><span>{t('Краткое наименование')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                            />
                            <Input defaultValue={'ru'} classNames={'col-span-5'} name={`names[1].locale`}
                                   placeholder={t('Введите краткое наименование')}
                                   property={{type: 'hidden'}}
                                   label={<div className={'flex'}><span>{t('Краткое наименование')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                            />
                            <div className={'col-span-12 '}>
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
                            </div>
                        </Form>
                    </Tab>
                    <Tab tab={'address'} label={t('Адрес')}>
                        <Form classNames={'grid grid-cols-12 gap-x-6'} onSubmit={(data) => onSubmit(data, 'region')}>
                            <Select isDisabled  defaultValue={{id:244,display:"O'ZBEKISTON",code:"UZB"}}
                                    classNames={'col-span-4'} name={'locations[0].address.country'}
                                    label={<div className={'flex'}><span>{t('Страна')}</span><img
                                        className={'ml-1'} src={orgIcon} alt="org"/></div>}
                                    params={{required: true}}
                                    options={get(organizationCountryList, 'data', [])}/>
                            <Select defaultValue={get(orgData, 'locations[0].address.state')} classNames={'col-span-4'}
                                    name={'locations[0].address.state'}
                                    label={<div className={'flex'}><span>{t('Регион')}</span><img
                                        className={'ml-1'} src={orgIcon} alt="org"/></div>}
                                    params={{required: true}}
                                    property={{onChange: (val) => setRegionId(get(val, 'id'))}}
                                    options={get(organizationRegions, 'data', [])}/>
                            <Select defaultValue={get(orgData, 'locations[0].address.district')} classNames={'col-span-4'}
                                    name={'locations[0].address.district'}
                                    label={<div className={'flex'}><span>{t('Район')}</span><img
                                        className={'ml-1'} src={orgIcon} alt="org"/></div>}
                                    params={{required: true}}
                                    property={{onChange: (val) => setDistrictId(get(val, 'id'))}}
                                    options={get(organizationDistricts, 'data', [])}
                            />
                            <Select defaultValue={get(orgData, 'locations[0].address.city')} classNames={'col-span-4'}
                                    name={'locations[0].address.city'}
                                    label={<div className={'flex'}><span>{t('Махалля')}</span><img
                                        className={'ml-1'} src={orgIcon} alt="org"/></div>}
                                    params={{required: true}}
                                    options={get(organizationNeighbors, 'data', [])}
                            />
                            <Input defaultValue={get(orgData, 'locations[0].address.line')} classNames={'col-span-4'}
                                   name={'locations[0].address.line'}
                                   params={{required: true}}
                                   placeholder={t('Улица')}
                                   label={<div className={'flex'}><span>{t('Улица')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                            />
                            <Input defaultValue={get(orgData, 'locations[0].address.block')} classNames={'col-span-2'}
                                   name={'locations[0].address.block'}
                                   params={{required: true,valueAsNumber:true}}
                                   placeholder={t('Дом')}
                                   label={<div className={'flex'}><span>{t('Дом')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                            />
                            <Input defaultValue={get(orgData, 'locations[0].address.postal_code')}
                                   classNames={'col-span-2'} name={'locations[0].address.postal_code'}
                                   placeholder={t('Почтовый индекс')}
                                   label={t('Почтовый индекс')}
                            />
                            <div className={'col-span-12 '}>
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
                            </div>
                        </Form>
                    </Tab>
                    <Tab tab={'region'} label={t('Регион обслуживания')}>
                        <Form classNames={'grid grid-cols-12 gap-x-6'} onSubmit={(data) => onSubmit(data, 'contact')}>

                            <Select defaultValue={get(orgData, 'service_area[0].state')} classNames={'col-span-6'}
                                    name={'service_area[0].state'}
                                    label={<div className={'flex'}><span>{t('Регион')}</span><img
                                        className={'ml-1'} src={orgIcon} alt="org"/></div>}
                                    params={{required: true}}
                                    options={get(organizationRegions, 'data', [])}/>

                            <div className={'col-span-12 '}>
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
                            </div>
                        </Form>
                    </Tab>
                    <Tab tab={'contact'} label={t('Контакты')}>
                        <Form classNames={'grid grid-cols-12 gap-x-6'} onSubmit={(data) => onSubmit(data, 'photo')}>
                            <h3 className={'mb-6 col-span-12 font-semibold'}>Контактная информация</h3>

                            <PhoneNumber defaultValue={get(orgData, 'contacts[0].telecoms[0].value')}
                                         classNames={'col-span-4'} name={`contacts[0].telecoms[0].value`}
                                         property={{mask: '99-999-99-99'}}
                                         params={{
                                             required: true,
                                             pattern: {
                                                 value: /^998(33|36|55|61|62|65|66|67|69|70|71|72|73|74|75|76|77|78|79|88|90|91|93|94|95|97|98|99)\d{7}$/,
                                                 message: 'Invalid format'
                                             }
                                         }}
                                         placeholder={t('Телефон')}
                                         label={<div className={'flex'}><span>{t('Телефон')}</span><img
                                             className={'ml-1'} src={orgIcon} alt="org"/></div>}
                            />


                            <Input defaultValue={get(orgData, 'contacts[0].telecoms[1].value')}
                                   classNames={'col-span-4'} name={`contacts[0].telecoms[1].value`}
                                   placeholder={t('E-mail')}
                                // params={{
                                //     pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                // }}
                                   label={t('E-mail')}
                            />


                            <Input defaultValue={get(orgData, 'contacts[0].telecoms[2].value')}
                                   classNames={'col-span-4'} name={`contacts[0].telecoms[2].value`}
                                   placeholder={t('URL адрес')}
                                   label={t('URL адрес')}
                            />
                            <Input params={{valueAsNumber:true}} defaultValue={1} classNames={'col-span-4'} name={`contacts[0].telecoms[0].system.id`}
                                   property={{type: 'hidden'}}
                            />
                            <Input params={{valueAsNumber:true}} defaultValue={2} classNames={'col-span-4'} name={`contacts[0].telecoms[1].system.id`}
                                   property={{type: 'hidden'}}
                            />
                            <Input params={{valueAsNumber:true}} defaultValue={3} classNames={'col-span-4'} name={`contacts[0].telecoms[2].system.id`}
                                   property={{type: 'hidden'}}
                            />
                            <div className={'col-span-12'}>
                                <button
                                    type={"button"}
                                    // onClick={() => setIncrement(prev => ++prev)}
                                    className={'mr-6 p-2.5 !pr-6 text-[#006D85] rounded-lg inline-flex  border border-[#006D85] font-bold text-center  mt-3  items-center '}>
                                    <Plus className={'mr-1'}/> <span>Добавить
                                    поле</span>
                                </button>
                                {
                                    increment > 0 && <button
                                        onClick={() => setIncrement(prev => --prev)}
                                        className={' p-2.5 !pr-6 text-[#EB5757] rounded-lg inline-flex  border border-[#EB5757] font-bold text-center  mt-6  items-center '}>
                                        <Minus className={'mr-1'}/> <span>Удалить
                                    поле</span>
                                    </button>
                                }
                            </div>
                            <div className={'col-span-12'}>
                                <hr className={'my-4'}/>
                            </div>
                            <h3 className={'mb-6 col-span-12 font-semibold'}>Географические координаты</h3>
                            <Input params={{valueAsNumber:true}} defaultValue={get(orgData, 'latitude')} classNames={'col-span-4'}
                                   name={`latitude`}
                                   placeholder={t('Широта')}
                                   label={t('Широта')}
                            />
                            <Input params={{valueAsNumber:true}} defaultValue={get(orgData, 'longitude')} classNames={'col-span-4'}
                                   name={`longitude`}
                                   placeholder={t('Долгота')}
                                   label={t('Долгота')}
                            />
                            <div className={'col-span-12 '}>
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
                            </div>
                        </Form>
                    </Tab>
                    <Tab tab={'photo'} label={t('Изображение')}>
                        <img src={fileUploadImg}/>
                        <div className={'col-span-12 '}>
                            <div className="flex justify-end">
                                <button onClick={() => setSearchParams(`tab=contact`)} type={'button'}
                                        className={'text-[#7A7A7A] border-2 border-[#7A7A7A] py-3 px-6 rounded-lg mr-4 inline-block   font-bold text-center  mt-6'}>
                                    {t('Назад')}
                                </button>
                                <button onClick={add} type={'submit'}
                                        className={' py-3 px-6 rounded-lg bg-primary inline-block  text-white font-bold text-center  mt-6'}>
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

export default OrganizationsContainer;