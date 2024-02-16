import React, {useEffect} from 'react';
import {get, isEqual, find} from "lodash";
import Field from "../../containers/form/field";
import orgIcon from "../../assets/icons/org.svg";
import {Minus, Plus} from "react-feather";
import {useTranslation} from "react-i18next";
import {URLS} from "../../constants/urls";
import {KEYS} from "../../constants/keys";
import {useFieldArray, useForm, useFormContext} from "react-hook-form";

const Identifiers = ({name = 'identifiers'}) => {
    const {t} = useTranslation();
    const {control} = useFormContext();
    const {fields, append, prepend, remove, swap, move, insert} = useFieldArray({
        control,
        name: name,
    });
    return (
        <div className={'col-span-12'}>
            {
                fields.map(({id,type,value,assigner_string,period_start,period_end}, index) => <div key={id} className={'grid grid-cols-12 gap-x-6 items-end pt-6 pb-3 border-b border-dashed'}>
                    <Field type={'async-select'}
                           url={URLS.identifierType}
                           keyId={KEYS.identifierType}
                           classNames={'col-span-4'} name={`${name}[${index}].type`}
                           params={{
                               required: true,
                           }}
                           defaultValue={type}
                           placeholder={t('Тип документа')}
                           label={<div className={'flex'}><span>{t('Тип документа')}</span><img
                               className={'ml-1'} src={orgIcon} alt="org"/></div>}
                    />

                    <Field
                        params={{
                            required: true,
                        }}
                        defaultValue={value}
                        type={'input'}
                        classNames={'col-span-4'} name={`${name}[${index}].value`}
                        placeholder={t('Серия и номер документа')}
                        label={<div className={'flex'}><span>{t('Серия и номер документа')}</span><img
                            className={'ml-1'} src={orgIcon} alt="org"/></div>}
                    />
                    {assigner_string && <Field
                        defaultValue={assigner_string}
                        type={'input'}
                        classNames={'col-span-4'} name={`${name}[${index}].assigner_string`}
                        placeholder={t('Название организации')}
                        label={t('Название организации')}
                    />}
                    {period_start && <Field
                        defaultValue={period_start}
                        type={'datepicker'}
                        classNames={'col-span-4'} name={`${name}[${index}].period_start`}
                        placeholder={t('Дата начала')}
                        label={t('Дата начала')}
                    />}
                    {period_end && <Field
                        defaultValue={period_end}
                        type={'datepicker'}
                        classNames={'col-span-4'} name={`${name}[${index}].period_end`}
                        placeholder={t('Дата окончания')}
                        label={t('Дата окончания')}
                    />}

                    {(index > 0) && <div className="col-span-4 mb-4">
                        <button
                            type={"button"}
                            onClick={() => remove(index)}
                            className={'cursor-pointer text-red-500 border-red-500 mr-6 p-2.5 !pr-6  rounded-lg inline-flex  border  font-bold text-center   items-center '}>
                            <Minus  className={'cursor-pointer text-red-500'} /> <span>{t("Удалить")}</span>
                        </button>

                    </div>}
                </div>)
            }
            <div className={'col-span-12 mt-3'}>
                <button
                    type={"button"}
                    onClick={() => append({})}
                    className={'mr-6 p-2.5 !pr-6 text-[#006D85] rounded-lg inline-flex  border border-[#006D85] font-bold text-center  mt-3  items-center '}>
                    <Plus className={'mr-1'}/> <span>{t("Добавить")}</span>
                </button>
            </div>
            <div className={'col-span-12'}>
                <hr className={'my-4'}/>
            </div>
        </div>
    )
};

export default Identifiers;