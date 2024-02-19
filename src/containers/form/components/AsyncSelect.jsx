import React, {useState, useEffect} from 'react';
import {components} from 'react-select';
import RAsyncSelect from 'react-select/async';
import clsx from "clsx";
import arrowIcon from "../../../assets/icons/select-arrow.svg";
import {Controller, useFormContext} from "react-hook-form";
import {get, hasIn, isEmpty} from "lodash";
import {useTranslation} from "react-i18next";
import {useGetAllQuery} from "../../../hooks/api";
import config from "../../../config";
import {useSettingsStore} from "../../../store";

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
    control: (base, state, error) => ({
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
    indicatorSeparator: (base, state) => ({
        ...base,
        display: 'none'
    })
});
const AsyncSelect = ({
                         property,
                         isMulti = false,
                         name,
                         placeholder = 'Не выбран',
                         params,
                         label = '',
                         classNames = '',
                         defaultValue = undefined,
                         url = '',
                         limit = 100,
                         keyId = 'list',
                     }) => {
    const {control, formState: {errors}} = useFormContext()
    const token = useSettingsStore(state => get(state, 'token', null))
    const [options, setOptions] = useState([])
    const {data, isLoading: loading} = useGetAllQuery({
        key: keyId, url: url, params: {
            params: {
                limit
            }
        }
    })
    const {t} = useTranslation()

    useEffect(() => {
        if (data) {
            setOptions(get(data, 'data.data', get(data, 'data', [])))
        }
    }, [data]);


    const loadOptions = async (inputValue) => {
        const res = await fetch(`${config.API_ROOT}${url}?name=${inputValue}`, {headers: {Authorization: `Bearer ${token}`}});
        const data = await res.json();
        const results = data;
        if (isEmpty(data)) {
            return [];
        }
        if (results.status !== 200) {
            return [];
        }
        
        return results;
    }
    return (
        <div className={clsx(`form-group ${classNames}`)}>
            {label && <label className={clsx('form-label')}
                             htmlFor={label}>{label}</label>}
            <Controller
                as={RAsyncSelect}
                control={control}
                name={name}
                rules={params}
                defaultValue={defaultValue}
                render={({field}) => <RAsyncSelect
                    {...field}
                    name={name}
                    isClearable
                    getOptionLabel={(option) => get(option, get(property, 'optionLabel', 'display'))}
                    getOptionValue={(option) => get(option, get(property, 'optionValue', 'id'))}
                    clearIndicator={true}
                    styles={customStyles(hasIn(errors, name))}
                    components={{DropdownIndicator}}
                    placeholder={placeholder}
                    isMulti={isMulti}
                    defaultOptions={options}
                    options={options}
                    loadOptions={loadOptions}
                    isLoading={loading}
                    cacheOptions
                />}
            />
            {get(errors, `${name}.type`) === 'required' &&
                <span className={'form-error'}>{t('Заполните обязательное поле')}</span>}
            {get(errors, `${name}.type`) === 'validation' &&
                <span className={'form-error'}>{get(errors, `${name}.message`)}</span>}
        </div>
    );
};

export default AsyncSelect;