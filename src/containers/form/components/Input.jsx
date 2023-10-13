import React from 'react';
import clsx from "clsx";
import {get, hasIn} from "lodash";

const Input = ({register=()=>{}, name='name', errors, property, params, label = '', classNames = '', ...rest}) => {
    return (
        <>
            <div className={clsx("form-group", classNames,{'!mb-0':get(property, 'type') == 'hidden'})}>
                {get(property, 'type', "text") != 'hidden' && <label className={'form-label'} htmlFor="#">{label}</label> }
                <input  {...register(name, {...params})} {...rest}
                        className={clsx('form-input', {'border-red-600': hasIn(errors, name)})}
                        type={get(property, 'type', "text")} disabled={get(property, 'disabled', false)}
                        step={get(property, "step", "any")}/>
                {errors[name]?.type == 'required' &&
                    <span className={'form-error'}>This field is required</span>}
                {errors[name]?.type == 'validation' &&
                    <span className={'form-error'}>{get(errors, `${name}.message`)}</span>}
                {errors[name]?.type === 'pattern' &&
                    <span className={'form-error'}>{get(errors, `${name}.message`)}</span>}
            </div>
        </>
    );
};

export default Input;