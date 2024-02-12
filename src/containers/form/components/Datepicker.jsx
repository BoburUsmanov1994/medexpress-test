import React, {useEffect, useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Controller} from "react-hook-form";
import {get, hasIn} from "lodash";
import dayjs from "dayjs";
import clsx from "clsx";
import {useTranslation} from "react-i18next";


const CustomDatepicker = ({
                              control,
                              disabled = false,
                              name,
                              errors,
                              params,
                              property,
                              defaultValue = new Date(),
                              label,
                              dateFormat = "yyyy/MM/dd",
                              classNames = ""
                          }) => {
    const [selected, setSelected] = useState(defaultValue)
    const {t} = useTranslation()
    useEffect(() => {
        if (defaultValue) {
            setSelected(defaultValue)
        }
    }, [defaultValue]);
    return (
        <div className={clsx("form-group", classNames)}>
            <label className={'form-label'}>{label ?? name}</label>
            <Controller
                control={control}
                name={name}
                rules={params}
                defaultValue={defaultValue}
                render={({field}) => (<DatePicker
                    dateFormat={dateFormat}
                    selected={dayjs(selected).toDate()}
                    onChange={(date) => setSelected(date)}
                    readOnly={disabled}
                    showMonthYearPicker={get(property, 'showMonthYearPicker')}
                    className={clsx('form-input pr-10', {'border-red-600': hasIn(errors, name)})}
                />)
                }
            />
            {errors[name]?.type === 'required' &&
                <span className={'text-red-600 text-xs'}>{t('Заполните обязательное поле')}</span>}
            {errors[name]?.type === 'validation' &&
                <span className={'text-red-600 text-xs'}>{get(errors, `${name}.message`)}</span>}
        </div>
    );
};

export default CustomDatepicker;