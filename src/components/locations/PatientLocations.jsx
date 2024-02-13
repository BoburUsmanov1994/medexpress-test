import React, {useState} from 'react';
import Field from "../../containers/form/field";
import orgIcon from "../../assets/icons/org.svg";
import {get, isNil, isObject} from "lodash";
import {useGetAllQuery} from "../../hooks/api";
import {KEYS} from "../../constants/keys";
import {URLS} from "../../constants/urls";
import {useTranslation} from "react-i18next";
import Title from "../title";

const PatientLocations = ({data,name='locations',dataKey=null}) => {
    const {t} = useTranslation()
    let [regionId, setRegionId] = useState(null);
    let [districtId, setDistrictId] = useState(null);
    const {data: organizationCountryList} = useGetAllQuery({
        key: KEYS.organizationCountry,
        url: URLS.organizationCountry,
        params: {
            params: {
                limit: 1000
            }
        },
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
    const {data: organizationDistricts} = useGetAllQuery({
        key: [KEYS.organizationTerritory, regionId],
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
    const {data: organizationNeighbors} = useGetAllQuery({
        key: [KEYS.organizationTerritory, districtId],
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
    return (
        <>
            {get(data,name,[]).length > 1 ? <>
                {
                    get(data,name,[]).map((_item,i)=><>
                        <Title className={'col-span-12 text-lg mb-2 font-semibold'}>{i+1}. {t(get(_item,'use.display'))}</Title>
                        <Field type={'select'} isDisabled
                               defaultValue={{id: 244, display: "O'ZBEKISTON", code: "UZB"}}
                               classNames={'col-span-4'} name={`${name}[${i}].country`}
                               label={<div className={'flex'}><span>{t('Страна')}</span><img
                                   className={'ml-1'} src={orgIcon} alt="org"/></div>}
                               params={{required: true}}
                               options={get(organizationCountryList, 'data', [])}/>
                        <Field type={'select'} defaultValue={get(data, `${name}[${i}].state`)}
                               classNames={'col-span-4'}
                               name={`${name}[${i}].state`}
                               label={<div className={'flex'}><span>{t('Регион')}</span><img
                                   className={'ml-1'} src={orgIcon} alt="org"/></div>}
                               params={{required: true}}
                               property={{onChange: (val) => setRegionId(get(val, 'id'))}}
                               options={get(organizationRegions, 'data', [])}/>
                        <Field type={'select'} defaultValue={get(data, `${name}[${i}].city`)}
                               classNames={'col-span-4'}
                               name={`${name}[${i}].city`}
                               label={<div className={'flex'}><span>{t('Район')}</span><img
                                   className={'ml-1'} src={orgIcon} alt="org"/></div>}
                               params={{required: true}}
                               property={{onChange: (val) => setDistrictId(get(val, 'id'))}}
                               options={get(organizationDistricts, 'data', [])}
                        />
                        <Field type={'select'} defaultValue={get(data, `${name}[${i}].district`) }
                               classNames={'col-span-4'}
                               name={`${name}[${i}].district`}
                               label={<div className={'flex'}><span>{t('Махалля')}</span><img
                                   className={'ml-1'} src={orgIcon} alt="org"/></div>}
                               params={{required: true}}
                               options={get(organizationNeighbors, 'data', [])}
                        />
                        <Field type={'input'} defaultValue={get(data, `${name}[${i}].line`)}
                               classNames={'col-span-4'}
                               name={`${name}[${i}].line`}
                               params={{required: true}}
                               placeholder={t('Улица')}
                               label={<div className={'flex'}><span>{t('Улица')}</span><img
                                   className={'ml-1'} src={orgIcon} alt="org"/></div>}
                        />
                        <Field type={'input'} defaultValue={get(data, `${name}[${i}].block`,null)}
                               classNames={'col-span-2'}
                               name={`${name}[${i}].block`}
                               params={{required: true}}
                               placeholder={t('Дом')}
                               label={<div className={'flex'}><span>{t('Дом')}</span><img
                                   className={'ml-1'} src={orgIcon} alt="org"/></div>}
                        />
                        <Field params={{pattern: {value: /^[0-9]{6}$/, message: 'Invalid value'}}}
                               type={'input-mask'} property={{mask: '999999'}}
                               defaultValue={get(data, `${name}[${i}].postal_code`)}
                               classNames={'col-span-2'} name={`${name}[${i}].postal_code`}
                               placeholder={t('Почтовый индекс')}
                               label={t('Почтовый индекс')}
                        />
                    </>)
                }
            </>:<>

                <Field type={'select'} isDisabled
                       defaultValue={{id: 244, display: "O'ZBEKISTON", code: "UZB"}}
                       classNames={'col-span-4'} name={`${name}[0].country`}
                       label={<div className={'flex'}><span>{t('Страна')}</span><img
                           className={'ml-1'} src={orgIcon} alt="org"/></div>}
                       params={{required: true}}
                       options={get(organizationCountryList, 'data', [])}/>
                <Field type={'select'} defaultValue={get(data, `${name}[0].state`)}
                       classNames={'col-span-4'}
                       name={`${name}[0].state`}
                       label={<div className={'flex'}><span>{t('Регион')}</span><img
                           className={'ml-1'} src={orgIcon} alt="org"/></div>}
                       params={{required: true}}
                       property={{onChange: (val) => setRegionId(get(val, 'id'))}}
                       options={get(organizationRegions, 'data', [])}/>
                <Field type={'select'} defaultValue={get(data, `${name}[0].city`)}
                       classNames={'col-span-4'}
                       name={`${name}[0].city`}
                       label={<div className={'flex'}><span>{t('Район')}</span><img
                           className={'ml-1'} src={orgIcon} alt="org"/></div>}
                       params={{required: true}}
                       property={{onChange: (val) => setDistrictId(get(val, 'id'))}}
                       options={get(organizationDistricts, 'data', [])}
                />
                <Field type={'select'} defaultValue={dataKey ? get(data, `${name}[0].district`) : get(data, `${name}[0].address.district`)}
                       classNames={'col-span-4'}
                       name={`${name}[0].district`}
                       label={<div className={'flex'}><span>{t('Махалля')}</span><img
                           className={'ml-1'} src={orgIcon} alt="org"/></div>}
                       params={{required: true}}
                       options={get(organizationNeighbors, 'data', [])}
                />
                <Field type={'input'} defaultValue={get(data, `${name}[0].line`)}
                       classNames={'col-span-4'}
                       name={`${name}[0].line`}
                       params={{required: true}}
                       placeholder={t('Улица')}
                       label={<div className={'flex'}><span>{t('Улица')}</span><img
                           className={'ml-1'} src={orgIcon} alt="org"/></div>}
                />
                <Field type={'input'} defaultValue={get(data, `${name}[0].block`,null)}
                       classNames={'col-span-2'}
                       name={`${name}[0].block`}
                       params={{required: true,valueAsNumber:true}}
                       placeholder={t('Дом')}
                       label={<div className={'flex'}><span>{t('Дом')}</span><img
                           className={'ml-1'} src={orgIcon} alt="org"/></div>}
                />
                <Field params={{pattern: {value: /^[0-9]{6}$/, message: 'Invalid value'}}}
                       type={'input-mask'} property={{mask: '999999'}}
                       defaultValue={get(data, `${name}[0].postal_code`)}
                       classNames={'col-span-2'} name={`${name}[0].postal_code`}
                       placeholder={t('Почтовый индекс')}
                       label={t('Почтовый индекс')}
                />
            </>}

        </>
    );
};

export default PatientLocations;