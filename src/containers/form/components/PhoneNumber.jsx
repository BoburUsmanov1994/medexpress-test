import React, {useEffect, useState} from 'react';
import {PatternFormat} from 'react-number-format';
import {Controller, useFormContext} from "react-hook-form";
import {get, hasIn} from "lodash";
import clsx from "clsx";
import {useTranslation} from "react-i18next";


const PhoneInput = ({
                        name,
                        params,
                        defaultValue = '',
                        label,
                        classNames = '',
                        format = "+998 ## ### ## ##",
                        regex = /^(33|36|55|61|62|65|66|67|69|70|71|72|73|74|75|76|77|78|79|88|90|91|93|94|95|97|98|99)\d{7}$/,
                    }) => {
    const {
        control, formState: {errors}, watch = () => {
        }, setValue = () => {
        }, trigger = () => {
        }
    } = useFormContext()
    const [selectedValue, setSelectedValue] = useState(defaultValue)
    const {t} = useTranslation()
    useEffect(() => {
        if (selectedValue) {
            if (regex?.test(String(selectedValue))) {
                setValue(name, `${selectedValue}`)
                trigger()
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
                render={({field}) => (
                    <PatternFormat name={name}
                                   {...field}
                                   onValueChange={(values) => {
                                       const {floatValue} = values;
                                       setSelectedValue(floatValue)
                                   }}
                                   value={selectedValue}
                                   format={format}
                                   className={clsx('form-input  w-full', {'border-red-600': hasIn(errors, name)})}
                                   mask={"_"}
                                   allowEmptyFormatting
                    />)
                }
            />
            {get(errors, `${name}.type`) === "required" &&
                <span className={'form-error'}>{t('Заполните обязательное поле')}</span>}
            {get(errors, `${name}.type`) === 'validation' &&
                <span className={'form-error'}>{get(errors, `${name}.message`)}</span>}
            {get(errors, `${name}.type`) === 'pattern' &&
                <span className={'form-error'}>{get(errors, `${name}.message`)}</span>}
        </div>
    );
};

export default PhoneInput;