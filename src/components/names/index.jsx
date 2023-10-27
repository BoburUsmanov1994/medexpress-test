import React, {useState} from 'react';
import clsx from "clsx";
import Field from "../../containers/form/field";
import {find, get, isEqual} from "lodash";
import orgIcon from "../../assets/icons/org.svg";
import {useTranslation} from "react-i18next";


const Index = ({data,fullWidth=false}) => {
    let [lang, setLang] = useState('uz');
    const {t} = useTranslation()
    return (
        <>
            <div className={'flex col-span-12 mb-4'}>
                <button type={'button'} onClick={() => setLang('uz')}
                        className={clsx('py-2 px-4 border border-[#EAEFF8] rounded-lg mr-2.5 ', {'!bg-[#E5F0F3] !border-[#E5F0F3]': lang == 'uz'})}>O’zbekcha
                </button>
                <button type={'button'} onClick={() => setLang('uz-Cyrl')}
                        className={clsx('py-2 px-4 border border-[#EAEFF8] rounded-lg mr-2.5 ', {'!bg-[#E5F0F3] !border-[#E5F0F3]': lang == 'uz-Cyrl'})}>Ўзбеқча
                </button>
                <button type={'button'} onClick={() => setLang('ru')}
                        className={clsx('py-2 px-4 border border-[#EAEFF8] rounded-lg mr-2.5', {'!bg-[#E5F0F3] !border-[#E5F0F3]': lang == 'ru'})}>Русский
                </button>
                <button type={'button'} onClick={() => setLang('en')}
                        className={clsx('py-2 px-4 border border-[#EAEFF8] rounded-lg mr-2.5', {'!bg-[#E5F0F3] !border-[#E5F0F3]': lang == 'en'})}>English
                </button>
            </div>

            {lang == 'uz' && <><Field type={'input'} params={{
                required: true,
                pattern: {value: /^[a-zA-Z0-9\s\'`,.]+$/, message: 'Invalid value'}
            }} defaultValue={get(find(get(data, `names`,[]),(item)=>isEqual(get(item,'locale'),'uz')),'value_short')} classNames={clsx('col-span-5',{'!col-span-12':fullWidth})}
                                      name={`names[0].value_short`}
                                      placeholder={t('Введите краткое наименование')}
                                      property={{type: 'text'}}
                                      label={<div className={'flex'}>
                                          <span>{t('Краткое наименование')}</span><img
                                          className={'ml-1'} src={orgIcon} alt="org"/></div>}
            />
                <Field type={'input'} params={{
                    required: true,
                    pattern: {value: /^[a-zA-Z0-9\s\'`,.]+$/, message: 'Invalid value'}
                }} defaultValue={get(find(get(data, `names`,[]),(item)=>isEqual(get(item,'locale'),'uz')),'value')} classNames={clsx('col-span-7',{'!col-span-12':fullWidth})}
                       name={'names[0].value'}
                       placeholder={t('Введите полное наименование')}
                       property={{type: 'text'}}
                       label={<div className={'flex'}><span>{t('Полное наименование')}</span><img
                           className={'ml-1'} src={orgIcon} alt="org"/></div>}
                />
                <Field type={'input'} defaultValue={'uz'} classNames={'col-span-5'}
                       name={`names[0].locale`}
                       placeholder={t('Введите краткое наименование')}
                       property={{type: 'hidden'}}
                       label={<div className={'flex'}><span>{t('Краткое наименование')}</span></div>}
                />
            </>}
            {lang == 'uz-Cyrl' && <><Field type={'input'} params={{
                pattern: {
                    value: /^[ўЎҳҲғҒқҚаАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ0-9_ -]+$/u,
                    message: 'Invalid value'
                }
            }} defaultValue={get(find(get(data, `names`,[]),(item)=>isEqual(get(item,'locale'),'uz-Cyrl')),'value_short')} classNames={clsx('col-span-5',{'!col-span-12':fullWidth})}
                                           name={`names[1].value_short`}
                                           placeholder={t('Введите краткое наименование')}
                                           property={{type: 'text'}}
                                           label={<div className={'flex'}>
                                               <span>{t('Краткое наименование')}</span></div>}
            />
                <Field type={'input'} params={{
                    pattern: {
                        value: /^[ўЎҳҲғҒқҚаАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ0-9_ -]+$/u,
                        message: 'Invalid value'
                    }
                }} defaultValue={get(find(get(data, `names`,[]),(item)=>isEqual(get(item,'locale'),'uz-Cyrl')),'value')} classNames={clsx('col-span-7',{'!col-span-12':fullWidth})}
                       name={'names[1].value'}
                       placeholder={t('Введите полное наименование')}
                       property={{type: 'text'}}
                       label={<div className={'flex'}><span>{t('Полное наименование')}</span></div>}
                />
                <Field type={'input'} defaultValue={'uz-Cyrl'} classNames={'col-span-5'}
                       name={`names[1].locale`}
                       placeholder={t('Введите краткое наименование')}
                       property={{type: 'hidden'}}
                       label={<div className={'flex'}><span>{t('Краткое наименование')}</span><img
                           className={'ml-1'} src={orgIcon} alt="org"/></div>}
                />
            </>}
            {lang == 'ru' && <><Field type={'input'} params={{
                pattern: {
                    value: /^[А-Яа-я\s_-]+$/u,
                    message: 'Invalid value'
                }
            }}
                                      defaultValue={get(find(get(data, `names`,[]),(item)=>isEqual(get(item,'locale'),'ru')),'value_short')}
                                      classNames={clsx('col-span-5',{'!col-span-12':fullWidth})}
                                      name={'names[2].value_short'}
                                      property={{type: 'text'}}
                                      placeholder={t('Введите краткое наименование')}
                                      label={<div className={'flex'}>
                                          <span>{t('Краткое наименование')}</span></div>}
            />
                <Field type={'input'}
                       params={{pattern: {value: /^[А-Яа-я0-9\s_-]+$/u, message: 'Invalid value'}}}
                       defaultValue={get(find(get(data, `names`,[]),(item)=>isEqual(get(item,'locale'),'ru')),'value')} classNames={clsx('col-span-7',{'!col-span-12':fullWidth})}
                       name={'names[2].value'}
                       property={{type: 'text'}}
                       placeholder={t('Введите полное наименование')}
                       label={<div className={'flex'}><span>{t('Полное наименование')}</span></div>}
                />
                <Field type={'input'} defaultValue={'ru'} classNames={'col-span-5'}
                       name={`names[2].locale`}
                       placeholder={t('Введите краткое наименование')}
                       property={{type: 'hidden'}}
                       label={<div className={'flex'}><span>{t('Краткое наименование')}</span></div>}
                />
            </>}

            {lang == 'en' && <><Field type={'input'} params={{
                pattern: {
                    value: /^[a-zA-Z0-9\s\'`,.]+$/,
                    message: 'Invalid value'
                }
            }}
                                      defaultValue={get(data, `names[3].value_short`)}
                                      classNames={clsx('col-span-5',{'!col-span-12':fullWidth})}
                                      name={'names[3].value_short'}
                                      property={{type: lang == 'en' ? 'text' : 'hidden'}}
                                      placeholder={t('Введите краткое наименование')}
                                      label={<div className={'flex'}>
                                          <span>{t('Краткое наименование')}</span></div>}
            />
                <Field type={'input'}
                       params={{pattern: {value: /^[a-zA-Z0-9\s\'`,.]+$/, message: 'Invalid value'}}}
                       defaultValue={get(data, `names[3].value`)} classNames={clsx('col-span-7',{'!col-span-12':fullWidth})}
                       name={'names[3].value'}
                       property={{type: lang == 'en' ? 'text' : 'hidden'}}
                       placeholder={t('Введите полное наименование')}
                       label={<div className={'flex'}><span>{t('Полное наименование')}</span></div>}
                />
                <Field type={'input'} defaultValue={'en'} classNames={'col-span-5'}
                       name={`names[3].locale`}
                       placeholder={t('Введите краткое наименование')}
                       property={{type: 'hidden'}}
                       label={<div className={'flex'}><span>{t('Краткое наименование')}</span></div>}
                /></>}
        </>
    );
};

export default Index;