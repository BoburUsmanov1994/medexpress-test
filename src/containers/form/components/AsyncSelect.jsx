import React, {useState, useEffect, useCallback} from 'react';
import {components} from 'react-select';
import RAsyncSelect from 'react-select/async';
import clsx from "clsx";
import arrowIcon from "../../../assets/icons/select-arrow.svg";
import {Controller} from "react-hook-form";
import {get, hasIn, debounce} from "lodash";
import {isFunction} from "lodash/lang";
import {useTranslation} from "react-i18next";
import {useGetAllQuery} from "../../../hooks/api";

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
                         control,
                         property,
                         isMulti = false,
                         name,
                         errors,
                         placeholder = 'Не выбран',
                         params,
                         label = '',
                         classNames = '',
                         defaultValue = undefined,
                         getValues = () => {
                         },
                         watch = () => {
                         },
                         url = '',
                         limit = 100,
                         keyId = 'list',
                         isDisabledSearch=false
                     }) => {
    const [options, setOptions] = useState([])
    const [search, setSearch] = useState('')
    const {data, isLoading: loading} = useGetAllQuery({
        key: [keyId, search], url: url, params: {
            params: {
                limit,
                name: isDisabledSearch ? null :search
            }
        }
    })
    const {t} = useTranslation()

    useEffect(() => {
        if (data) {
            setOptions(get(data, 'data.data', get(data,'data',[])))
        }
    }, [data,search,name]);

    const changeHandler = (val) => {
        setSearch(val)
    }

    const debouncedChangeHandler = debounce(changeHandler, 500)


    const loadOptions = async (inputValue) => {
        await debouncedChangeHandler(inputValue)
        return options;
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
            {errors[name]?.type == 'required' &&
            <span className={'form-error'}>{t('Заполните обязательное поле')}</span>}
            {errors[name]?.type == 'validation' &&
            <span className={'form-error'}>{get(errors, `${name}.message`)}</span>}
        </div>
    );
};

export default AsyncSelect;