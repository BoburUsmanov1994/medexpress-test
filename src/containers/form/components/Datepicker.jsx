import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Controller} from "react-hook-form";
import {get, hasIn} from "lodash";
import dayjs from "dayjs";
import clsx from "clsx";


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
                          }) => {
    return (
        <div className="form-group">
            <label className={'form-label'}>{label ?? name}</label>
            <Controller
                control={control}
                name={name}
                rules={params}
                defaultValue={defaultValue}
                render={({field}) => (<DatePicker
                    dateFormat={dateFormat}
                    selected={dayjs(field.value).toDate()}
                    onChange={(date) => field.onChange(date)}
                    readOnly={disabled}
                    showMonthYearPicker={get(property, 'showMonthYearPicker')}
                    className={clsx('form-input pr-10', {'border-red-600': hasIn(errors, name)})}
                />)
                }
            />
            {errors[name]?.type == 'required' &&
                <span className={'text-red-600 text-xs'}>This field is required</span>}
            {errors[name]?.type == 'validation' &&
                <span className={'text-red-600 text-xs'}>{get(errors, `${name}.message`)}</span>}

        </div>
    );
};

export default CustomDatepicker;