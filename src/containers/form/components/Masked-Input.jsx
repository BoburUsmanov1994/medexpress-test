import React, {useEffect} from 'react';
import InputMask from 'react-input-mask';
import {Controller, useFormContext} from "react-hook-form";
import {get, hasIn} from "lodash";
import clsx from "clsx";
import {isFunction} from "lodash/lang";
import {useTranslation} from "react-i18next";


const MaskedInput = ({
                         name,
                         params,
                         property,
                         defaultValue = '',
                         label,
                         classNames = '',
                     }) => {
    const { control,   formState: { errors },getValues = () => {},watch=()=>{}} = useFormContext()
    const {t} = useTranslation()
    useEffect(() => {
        if(isFunction(get(property,'onChange'))){
            get(property,'onChange')(getValues(name), name)
        }
    }, [watch(name)]);
    return (
        <div className={clsx("form-group", classNames)}>
            <label className={'form-label'}>{label ?? name}</label>
            <Controller
                as={InputMask}
                control={control}
                name={name}
                rules={params}
                defaultValue={defaultValue}
                render={({field}) => (<InputMask
                    value={field.value}
                    onChange={field.onChange}
                    className={clsx('form-input  w-full',get(property,'className'), {'border-red-600': hasIn(errors, name)})}
                    placeholder={get(property, "placeholder")}
                    mask={get(property, "mask", "aa")}
                    maskChar={get(property, "maskChar", "_")}
                >
                    {(inputProps) => (
                        <input
                            {...inputProps}
                            type="text"
                        />
                    )}
                </InputMask>)
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

export default MaskedInput;