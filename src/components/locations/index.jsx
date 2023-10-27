import React, {useState} from 'react';
import Field from "../../containers/form/field";
import orgIcon from "../../assets/icons/org.svg";
import {get, isNil, isObject} from "lodash";
import {useGetAllQuery} from "../../hooks/api";
import {KEYS} from "../../constants/keys";
import {URLS} from "../../constants/urls";
import {useTranslation} from "react-i18next";

const Index = ({data}) => {
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
            <Field type={'select'} isDisabled
                   defaultValue={{id: 244, display: "O'ZBEKISTON", code: "UZB"}}
                   classNames={'col-span-4'} name={'locations[0].address.country'}
                   label={<div className={'flex'}><span>{t('Страна')}</span><img
                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                   params={{required: true}}
                   options={get(organizationCountryList, 'data', [])}/>
            <Field type={'select'} defaultValue={get(data, 'locations[0].address.state')}
                   classNames={'col-span-4'}
                   name={'locations[0].address.state'}
                   label={<div className={'flex'}><span>{t('Регион')}</span><img
                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                   params={{required: true}}
                   property={{onChange: (val) => setRegionId(get(val, 'id'))}}
                   options={get(organizationRegions, 'data', [])}/>
            <Field type={'select'} defaultValue={get(data, 'locations[0].address.district')}
                   classNames={'col-span-4'}
                   name={'locations[0].address.district'}
                   label={<div className={'flex'}><span>{t('Район')}</span><img
                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                   params={{required: true}}
                   property={{onChange: (val) => setDistrictId(get(val, 'id'))}}
                   options={get(organizationDistricts, 'data', [])}
            />
            <Field type={'select'} defaultValue={get(data, 'locations[0].address.city')}
                   classNames={'col-span-4'}
                   name={'locations[0].address.city'}
                   label={<div className={'flex'}><span>{t('Махалля')}</span><img
                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                   params={{required: true}}
                   options={get(organizationNeighbors, 'data', [])}
            />
            <Field type={'input'} defaultValue={get(data, 'locations[0].address.line')}
                   classNames={'col-span-4'}
                   name={'locations[0].address.line'}
                   params={{required: true}}
                   placeholder={t('Улица')}
                   label={<div className={'flex'}><span>{t('Улица')}</span><img
                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
            />
            <Field type={'input'} defaultValue={get(data, 'locations[0].address.block',null)}
                   classNames={'col-span-2'}
                   name={'locations[0].address.block'}
                   params={{required: true,valueAsNumber:true}}
                   placeholder={t('Дом')}
                   label={<div className={'flex'}><span>{t('Дом')}</span><img
                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
            />
            <Field params={{pattern: {value: /^[0-9]{6}$/, message: 'Invalid value'}}}
                   type={'input-mask'} property={{mask: '999999'}}
                   defaultValue={get(data, 'locations[0].address.postal_code')}
                   classNames={'col-span-2'} name={'locations[0].address.postal_code'}
                   placeholder={t('Почтовый индекс')}
                   label={t('Почтовый индекс')}
            />
        </>
    );
};

export default Index;