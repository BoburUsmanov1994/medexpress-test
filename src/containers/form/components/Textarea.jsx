import React from 'react';
import clsx from "clsx";
import {get, hasIn} from "lodash";
import {useTranslation} from "react-i18next";
import {useFormContext} from "react-hook-form";

const Textarea = ({name='name', property, params, label = '', classNames = '',defaultValue='', ...rest}) => {
    const {t} = useTranslation()
    const { register,   formState: { errors } } = useFormContext()
    return (
        <>
            <div className={clsx("form-group", classNames,{'!mb-0':get(property, 'type') === 'hidden'})}>
                {get(property, 'type', "text") !== 'hidden' && <label className={'form-label'} htmlFor="#">{label}</label> }
                <textarea  defaultValue={defaultValue}  {...register(name, {...params})} {...rest}
                        className={clsx('form-input h-40', {'border-red-600': hasIn(errors, name)})}
                       disabled={get(property, 'disabled', false)}
                        />
                {get(property, 'type') !== "hidden" && <>{get(errors,`${name}.type`) === 'required' &&
                <span className={'form-error'}>{t('Заполните обязательное поле')}</span>}
                {get(errors,`${name}.type`) === 'validation' &&
                <span className={'form-error'}>{get(errors, `${name}.message`)}</span>}
                {get(errors,`${name}.type`) === 'pattern' &&
                <span className={'form-error'}>{get(errors, `${name}.message`)}</span>} </> }
            </div>
        </>
    );
};

export default Textarea;