import React, {useEffect, useState} from 'react';
import {PatternFormat} from 'react-number-format';
import {Controller} from "react-hook-form";
import {get} from "lodash";
import clsx from "clsx";
import {useTranslation} from "react-i18next";


const PhoneInput = ({
                        control,
                        disabled = false,
                        name,
                        errors,
                        params,
                        defaultValue = '',
                        label,
                        classNames = '',
                        format = "+998 ## ### ## ##",
                        regex = /^(33|36|55|61|62|65|66|67|69|70|71|72|73|74|75|76|77|78|79|88|90|91|93|94|95|97|98|99)\d{7}$/,
                        watch = () => {
                        },
                        setValue = () => {
                        },
                    }) => {
    const [selectedValue, setSelectedValue] = useState(null)
    const {t} = useTranslation()
    useEffect(() => {
        if (selectedValue) {
            if (regex?.test(String(selectedValue))) {
                setValue(name, selectedValue)
            }
        }
    }, [watch(name)]);

    return (
        <div className={clsx("form-group", classNames)}>
            <label className={'form-label'}>{label ?? name}</label>
            <Controller
                control={control}
                name={name}
                rules={params}
                defaultValue={defaultValue}
                render={({field}) => (
                    <PatternFormat name={name}
                                   {...field}
                                   onValueChange={(values) => {
                                       const {floatValue} = values;
                                       setSelectedValue(floatValue)
                                   }}
                                   value={selectedValue}
                                   format={format}
                                   className={clsx('form-input  w-full', {'border-red-600': !regex?.test(String(selectedValue))})}
                                   mask={"_"}
                                   allowEmptyFormatting
                    />)
                }
            />
            {get(errors, `${name}.type`) === "required" &&
            <span className={'form-error'}>{t('Заполните обязательное поле')}</span>}
            {get(errors, `${name}.type`) === 'validation' &&
            <span className={'form-error'}>{get(errors, `${name}.message`)}</span>}
            {!regex?.test(String(selectedValue)) &&
            <span className={'form-error'}>Invalid format</span>}


        </div>
    );
};

export default PhoneInput;