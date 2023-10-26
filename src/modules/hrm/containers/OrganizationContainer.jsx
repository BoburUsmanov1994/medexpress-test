import React, {useState} from 'react';
import Title from "../../../components/title";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {ChevronLeft, Edit2, Loader, Plus} from "react-feather";
import {useGetAllQuery, useGetOneQuery, usePostQuery} from "../../../hooks/api";
import {URLS} from "../../../constants/urls";
import {KEYS} from "../../../constants/keys";
import {ContentLoader, OverlayLoader} from "../../../components/loader";
import {get, head, find, isEqual} from "lodash";
import {Tab, Tabs} from "../../../components/tab";
import Content from "../../../components/content";
import photoImg from "../../../assets/images/photo.png";
import mapImg from "../../../assets/images/map.png";
import {PatternFormat} from "react-number-format";
import Modal from "../../../components/modal";
import Form from "../../../containers/form";
import Field from "../../../containers/form/field";
import orgIcon from "../../../assets/icons/org.svg";
import Names from "../../../components/names"

const OrganizationContainer = ({id = null}) => {
    const [openDepartmentModal, setDepartmentModal] = useState(false)
    const [open, setOpen] = useState(false)
    const {t} = useTranslation();
    const [defaultDept, setDefaultDept] = useState('dept')
    const {data, isLoading} = useGetOneQuery({id: id, url: URLS.organizations})
    const {
        data: departments,
        isLoading: isLoadingDepartments
    } = useGetAllQuery({
        key: KEYS.organizationDepartments,
        url: `${URLS.organizations}/${id}${URLS.organizationDepartments}`
    })

    const {data: organizationTypeMedicalList, isLoading: isLoadingTypeMedicalList} = useGetAllQuery({
        key: KEYS.organizationTypeMedical,
        url: URLS.organizationTypeMedical,
        params: {
            params: {
                limit: 100
            }
        },
        enabled: openDepartmentModal
    })
    const {data: organizationTypeList} = useGetAllQuery({
        key: KEYS.organizationType,
        url: URLS.organizationType,
        params: {
            params: {
                limit: 100
            }
        },
        enabled: openDepartmentModal
    })

    const {data: roles,isLoading:isLoadingRoles} = useGetAllQuery({
        key: KEYS.practitionerRole,
        url: URLS.practitionerRole,
        params: {
            params: {
                limit: 100
            }
        },
        enabled: open
    })

    const {
        mutate: addDepartmentRequest, isLoading: isLoadingPost
    } = usePostQuery({listKeyId: KEYS.organizationDepartments})

    const addDepartment = ({data: requestData}) => {
        const {parent, ...rest} = requestData;
        addDepartmentRequest({
            url: `${URLS.organizations}/${id}${URLS.organizationDepartments}`,
            attributes: {
                ...rest,
                parent: parent ?? undefined,
                display: get(rest, 'names[0].value'),
                type: find(get(organizationTypeList, 'data', []), item => isEqual(get(item, 'code'), defaultDept == 'dept' ? 'dept' : 'prov'))
            },
        }, {
            onSuccess: () => {
                setDepartmentModal(false);
            }
        })
    }
    if (isLoading) {
        return <OverlayLoader/>
    }
    console.log('departments',departments)
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
                                            <strong className={'w-2/3'}><PatternFormat displayType={'text'}
                                                                                       format={"+998 ## ### ## ##"}
                                                                                       value={get(find(get(head(get(data, 'data.contacts', [])), 'telecoms', []), _item => get(_item, 'system.id') == 1), 'value')}/></strong>
                                        </div>
                                        <div className={'flex py-5 border-b items-center'}>
                                            <span className={'w-1/3'}>Электронная почта:</span>
                                            <strong
                                                className={'text-primary w-2/3'}>{get(find(get(head(get(data, 'data.contacts', [])), 'telecoms', []), _item => get(_item, 'system.id') == 2), 'value')}</strong>
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
                            <Content sm>

                            </Content>
                        </Tab>
                        <Tab tab={'departments'} label={t('Орг. структура')}>
                            <div className="grid grid-cols-12 gap-x-6">
                                <div className="col-span-3">
                                    <Content sm classNames={'!p-4'}>
                                        <ul className={'mb-6'}>
                                            {get(departments,'data.data',[]).map(department=><li className={'cursor-pointer text-[#222222] font-bold py-1.5 mb-2'} key={get(department,'id')}>{get(department,'display')}</li>)}
                                        </ul>
                                        <button onClick={() => setDepartmentModal(true)}
                                                className={'text-primary font-bold flex items-center justify-center w-full text-center p-4 border-t border-1 border-t-[rgba(0,0,0,0.1)]'}>Добавить
                                            отделение <Plus className={'ml-2'} size={24}/></button>
                                    </Content>
                                </div>
                                <div className="col-span-9">
                                    <Content sm>
                                        <div className="grid grid-cols-12">
                                            <div className="col-span-6">
                                                <Title sm>Штатные единицы</Title>
                                            </div>
                                            <div className="col-span-6 text-right">
                                                  <button
                                                onClick={() => setOpen(true)}
                                                className={'inline-flex py-2.5 pl-2.5 pr-5 rounded-lg text-primary items-center font-bold border-2 border-primary text-center '}>
                                                <Plus className={'mr-1.5'}/>
                                                {t('Добавить должность')}
                                            </button>
                                            </div>
                                        </div>
                                    </Content>
                                </div>
                            </div>

                        </Tab>
                    </Tabs>
                </div>
            </div>
            <Modal open={openDepartmentModal} onClose={() => setDepartmentModal(false)} classNames={'!w-[552px]'}
                   title={t('Добавить отделение')}>
                {isLoadingTypeMedicalList ? <ContentLoader/> :
                    <Form classNames={'grid grid-cols-12 gap-x-6'} formRequest={(data) => addDepartment(data)}
                          footer={<div className={'col-span-12 '}>
                              <div className="flex justify-end">
                                  <button onClick={() => setDepartmentModal(false)} type={'button'}
                                          className={'text-[#7A7A7A] border-2 border-[#7A7A7A] py-3 px-6 rounded-lg mr-4 inline-block   font-bold text-center  mt-6'}>
                                      {t('Отмена')}
                                  </button>
                                  <button type={'submit'}
                                          className={' py-3 px-6 rounded-lg bg-primary inline-block  text-white font-bold text-center  mt-6'}>
                                      {t('Сохранить')}
                                  </button>
                              </div>
                          </div>}>
                        <Field isDisabled type={'select'} isLoading={isLoadingTypeMedicalList}
                               defaultValue={find(get(organizationTypeMedicalList, 'data', []), _item => isEqual(get(_item, 'code'), defaultDept))}
                               property={{onChange: (val) => get(val, 'code')}}
                               classNames={'col-span-12'}
                               name={'medical_type'}
                               label={<div className={'flex'}><span>{t('Тип организации')}</span><img
                                   className={'ml-1'} src={orgIcon} alt="org"/></div>}
                               params={{required: true}}
                               options={get(organizationTypeMedicalList, 'data', [])}/>
                        <Field type={'async-select'} isDisabledSearch
                               url={`${URLS.organizations}/${id}${URLS.organizationDepartments}`}
                               keyId={KEYS.organizationsListForSelect}
                               classNames={'col-span-12'}
                               name={'parent'}
                               label={t('Родительская организация')}
                        />

                        <hr className={'mt-2 mb-6 col-span-12'}/>
                        <Names fullWidth/>
                    </Form>}
            </Modal>

            <Modal open={open} onClose={() => setOpen(false)} classNames={'!w-[552px]'}
                   title={t('Добавить отделение')}>

                    <Form classNames={'grid grid-cols-12 gap-x-6'} formRequest={(data) => addDepartment(data)}
                          footer={<div className={'col-span-12 '}>
                              <div className="flex justify-end">
                                  <button onClick={() => setOpen(false)} type={'button'}
                                          className={'text-[#7A7A7A] border-2 border-[#7A7A7A] py-3 px-6 rounded-lg mr-4 inline-block   font-bold text-center  mt-6'}>
                                      {t('Отмена')}
                                  </button>
                                  <button type={'submit'}
                                          className={' py-3 px-6 rounded-lg bg-primary inline-block  text-white font-bold text-center  mt-6'}>
                                      {t('Сохранить')}
                                  </button>
                              </div>
                          </div>}>
                        <Field type={'async-select'} isDisabledSearch
                               url={`${URLS.organizations}/${id}${URLS.organizationDepartments}`}
                               keyId={KEYS.organizationsListForSelect}
                               classNames={'col-span-12'}
                               name={'parent'}
                               label={t('Отделение')}
                        />
                        <Field type={'async-select'}
                               classNames={'col-span-12'}
                               name={'role'}
                               label={t('По классификатору')}
                               params={{required: true}}
                        />

                        <hr className={'mt-2 mb-6 col-span-12'}/>
                        <Names fullWidth/>
                    </Form>
            </Modal>
        </div>
    );
}

export default OrganizationContainer;