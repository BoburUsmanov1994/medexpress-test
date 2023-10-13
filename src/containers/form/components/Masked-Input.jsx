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
        <div className={clsx("form-group",classNames)}>
            <label className={'form-label'}>{label ?? name}</label>
            <Controller
                control={control}
                name={name}
                rules={params}
                defaultValue={defaultValue}
                render={({field}) => (<InputMask
                    {...field}
                    className={clsx('form-input  w-full', {'border-red-600': hasIn(errors, name)})}
                    placeholder={get(property, "placeholder")}
                    mask={get(property, "mask", "aa")}
                    maskChar={get(property, "maskChar", " ")}
                    disabled={disabled}
                />)
                }
            />
            {errors[name]?.type === 'required' &&
                <span className={'form-error'}>This field is required</span>}
            {errors[name]?.type === 'validation' &&
                <span className={'form-error'}>{get(errors, `${name}.message`)}</span>}

        </div>
    );
};

export default MaskedInput;