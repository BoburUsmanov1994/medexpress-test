import React from 'react';
import {get, isEqual, find, forEach} from "lodash";
import Field from "../../containers/form/field";
import orgIcon from "../../assets/icons/org.svg";
import {Minus, Plus} from "react-feather";
import {useTranslation} from "react-i18next";
import FormConsumer from "../../context/form/FormConsumer";
import {URLS} from "../../constants/urls";
import {KEYS} from "../../constants/keys";

const Identifiers = ({data, name = 'identifiers'}) => {
    const {t} = useTranslation();
console.log(get(data,name,[]),data)
    return (
        <>
            <FormConsumer>{({attrs}) => {
                console.log('attrs',attrs)
                return (<>
                    {
                        get(data,name,[]).map((item, index) => <>
                            <Field type={'async-select'}
                                   url={URLS.identifierType}
                                   keyId={KEYS.identifierType}
                                   classNames={'col-span-4'} name={`${name}[${index}].type.value`}
                                   params={{
                                       required: true,
                                   }}
                                   placeholder={t('Тип документа')}
                                   label={<div className={'flex'}><span>{t('Тип документа')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                            />


                            <Field
                                params={{
                                    required: true,
                                }}
                                type={'input'}
                                classNames={'col-span-4'} name={`${name}[${index}].value`}
                                placeholder={t('Серия и номер документа')}
                                label={<div className={'flex'}><span>{t('Серия и номер документа')}</span><img
                                    className={'ml-1'} src={orgIcon} alt="org"/></div>}
                            />

                            <Field type={'input'} params={{
                                pattern: {
                                    value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
                                    message: "Invalid format"
                                }
                            }}
                                   defaultValue={get(find(get(data, `telecoms`, []), item => isEqual(get(item, 'system.id'), 3)), 'value')}
                                   classNames={'col-span-3'} name={`telecoms[${index + 2}].value`}
                                   placeholder={t('URL адрес')}
                                   label={t('URL адрес')}
                            />
                            {index > 0 && <div className="col-span-1 pt-8 text-center">
                                <Minus onClick={() => get(attrs, 'fieldArrayAttrs.remove', () => {
                                })(index)} className={'cursor-pointer text-red-500'} size={32}/>
                            </div>}
                            <Field type={'input'} params={{valueAsNumber: true}} defaultValue={1}
                                   classNames={'col-span-12'}
                                   name={`telecoms[${index}].system.id`}
                                   property={{type: 'hidden'}}
                            />
                            <Field type={'input'} params={{valueAsNumber: true}} defaultValue={2}
                                   classNames={'col-span-12'}
                                   name={`telecoms[${index + 1}].system.id`}
                                   property={{type: 'hidden'}}
                            />
                            <Field type={'input'} params={{valueAsNumber: true}} defaultValue={3}
                                   classNames={'col-span-12'}
                                   name={`telecoms[${index + 2}].system.id`}
                                   property={{type: 'hidden'}}
                            />
                        </>)
                    }
                    {
                        get(attrs, 'fieldArrayAttrs.fields', []).map((item, index) => <>
                            <Field type={'async-select'}
                                   url={URLS.identifierType}
                                   keyId={KEYS.identifierType}
                                   classNames={'col-span-4'} name={`${name}[${index}].type.value`}
                                   params={{
                                       required: true,
                                   }}
                                   placeholder={t('Тип документа')}
                                   label={<div className={'flex'}><span>{t('Тип документа')}</span><img
                                       className={'ml-1'} src={orgIcon} alt="org"/></div>}
                            />


                            <Field
                                params={{
                                    required: true,
                                }}
                                type={'input'}
                                classNames={'col-span-4'} name={`${name}[${index}].value`}
                                placeholder={t('Серия и номер документа')}
                                label={<div className={'flex'}><span>{t('Серия и номер документа')}</span><img
                                    className={'ml-1'} src={orgIcon} alt="org"/></div>}
                            />

                            <Field type={'input'} params={{
                                pattern: {
                                    value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
                                    message: "Invalid format"
                                }
                            }}
                                   defaultValue={get(find(get(data, `telecoms`, []), item => isEqual(get(item, 'system.id'), 3)), 'value')}
                                   classNames={'col-span-3'} name={`telecoms[${index + 2}].value`}
                                   placeholder={t('URL адрес')}
                                   label={t('URL адрес')}
                            />
                            {index > 0 && <div className="col-span-1 pt-8 text-center">
                                <Minus onClick={() => get(attrs, 'fieldArrayAttrs.remove', () => {
                                })(index)} className={'cursor-pointer text-red-500'} size={32}/>
                            </div>}
                            <Field type={'input'} params={{valueAsNumber: true}} defaultValue={1}
                                   classNames={'col-span-12'}
                                   name={`telecoms[${index}].system.id`}
                                   property={{type: 'hidden'}}
                            />
                            <Field type={'input'} params={{valueAsNumber: true}} defaultValue={2}
                                   classNames={'col-span-12'}
                                   name={`telecoms[${index + 1}].system.id`}
                                   property={{type: 'hidden'}}
                            />
                            <Field type={'input'} params={{valueAsNumber: true}} defaultValue={3}
                                   classNames={'col-span-12'}
                                   name={`telecoms[${index + 2}].system.id`}
                                   property={{type: 'hidden'}}
                            />
                        </>)
                    }
                    <div className={'col-span-12'}>
                        <button
                            type={"button"}
                            onClick={() => get(attrs, 'fieldArrayAttrs.append', () => {
                            })({})}
                            className={'mr-6 p-2.5 !pr-6 text-[#006D85] rounded-lg inline-flex  border border-[#006D85] font-bold text-center  mt-3  items-center '}>
                            <Plus className={'mr-1'}/> <span>Добавить</span>
                        </button>


                    </div>
                </>)
            }}</FormConsumer>

            <div className={'col-span-12'}>
                <hr className={'my-4'}/>
            </div>
        </>
    );
};

export default Identifiers;