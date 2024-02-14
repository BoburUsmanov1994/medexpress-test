import React, {useEffect} from 'react';
import RSelect, {components} from 'react-select';
import clsx from "clsx";
import arrowIcon from "../../../assets/icons/select-arrow.svg";
import {Controller, useFormContext} from "react-hook-form";
import {get, hasIn} from "lodash";
import {isFunction} from "lodash/lang";
import {useTranslation} from "react-i18next";

const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <img src={arrowIcon} alt={'arrow'}/>
            </components.DropdownIndicator>
        )
    );
};
const customStyles = (hasError = false) => ({
    control: (base) => ({
        ...base,
        background: "#fff",
        borderColor: hasError ? "red" : "rgba(0, 0, 0, 0.1)",
        borderRadius: '8px',
        outline: "none",
        display: "flex",
        overflow: 'hidden',
        padding: '4px 12px',
        width: '100%',
        minWidth: '200px',
        minHeight: '48px',
        fontSize: '16px',
        fontWeight: '400',
        "&:hover": {
            borderColor: '#006D85',
            outline: "none",
        },
        "&:focus": {
            borderColor: '#006D85',
            outline: "none",
        }
    }),
    indicatorSeparator: (base) => ({
        ...base,
        display: 'none'
    })
});
const Select = ({
                    property,
                    isMulti = false,
                    name,
                    placeholder = 'Не выбран',
                    params,
                    label = '',
                    options = [],
                    classNames = '',
                    defaultValue=undefined,
                    isDisabled = false,
                    isLoading=false
                }) => {
    const { control,   formState: { errors },getValues=()=>{},watch=()=>{}} = useFormContext()
    const {t} = useTranslation()
    useEffect(() => {
        if(isFunction(get(property,'onChange'))){
            get(property,'onChange')(getValues(name), name);
        }

    }, [watch(name)]);
    return (
        <div className={clsx(`form-group ${classNames}`)}>
            {label && <label className={clsx('form-label')}
                             htmlFor={label}>{label}</label>}
            <Controller
                control={control}
                name={name}
                rules={params}
                defaultValue={defaultValue}
                render={({field}) => <RSelect
                    {...field}
                    isClearable
                    getOptionLabel={(option) => get(option, get(property, 'optionLabel', 'display'))}
                    getOptionValue={(option) => get(option, get(property, 'optionValue', 'id'))}
                    clearIndicator={true}
                    styles={customStyles(hasIn(errors, name))}
                    options={options}
                    components={{DropdownIndicator}}
                    placeholder={placeholder}
                    isMulti={isMulti}
                    defaultValue={defaultValue}
                    isDisabled={isDisabled}
                    isLoading={isLoading}
                />}
            />
            {get(errors,`${name}.type`) == 'required' &&
                <span className={'form-error'}>{t('Заполните обязательное поле')}</span>}
            {get(errors,`${name}.type`) == 'validation' &&
                <span className={'form-error'}>{get(errors, `${name}.message`)}</span>}
        </div>
    );
};

export default Select;