import React from 'react';
import InputMask from 'react-input-mask';
import {Controller} from "react-hook-form";
import {get, hasIn} from "lodash";
import clsx from "clsx";


const MaskedInput = ({
                         control,
                         disabled = false,
                         name,
                         errors,
                         params,
                         property,
                         defaultValue = '',
                         label,
                         classNames = '',
                     }) => {
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
                    className={clsx('form-input  w-full', {'border-red-600': hasIn(errors, name)})}
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
            {errors[name]?.type === 'required' &&
            <span className={'form-error'}>This field is required</span>}
            {errors[name]?.type === 'pattern' &&
            <span className={'form-error'}>Value is not valid</span>}
            {errors[name]?.type === 'validation' &&
            <span className={'form-error'}>{get(errors, `${name}.message`)}</span>}

        </div>
    );
};

export default MaskedInput;