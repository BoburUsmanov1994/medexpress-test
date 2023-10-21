import React from 'react';
import {PatternFormat} from 'react-number-format';
import {Controller} from "react-hook-form";
import {get, hasIn} from "lodash";
import clsx from "clsx";
import {useTranslation} from "react-i18next";


const PhoneInput = ({
                        control,
                        disabled = false,
                        name,
                        errors,
                        params,
                        property,
                        defaultValue = '',
                        label,
                        classNames = '',
                        format = "998(##)#######"
                    }) => {
    const {t} = useTranslation()
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
                                   format={format}
                                   className={clsx('form-input  w-full', {'border-red-600': hasIn(errors, name)})}
                                   mask={"_"}
                                   allowEmptyFormatting
                    />)
                }
            />
            {get(errors,`${name}.type`) === "required" &&
                <span className={'form-error'}>{t('Заполните обязательное поле')}</span>}
            {get(errors,`${name}.type`) === 'validation' &&
                <span className={'form-error'}>{get(errors, `${name}.message`)}</span>}
            {get(errors,`${name}.type`) === 'pattern' &&
                <span className={'form-error'}>{get(errors, `${name}.message`)}</span>}


        </div>
    );
};

export default PhoneInput;