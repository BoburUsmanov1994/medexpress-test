import React, {useEffect, useState} from 'react';
import RSelect, {components} from 'react-select';
import clsx from "clsx";
import arrowIcon from "../../assets/icons/select-arrow.svg"

const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <img src={arrowIcon} alt={'arrow'}/>
            </components.DropdownIndicator>
        )
    );
};
const customStyles = (sm = false) => ({
    control: (base, state, error) => ({
        ...base,
        background: "#fff",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: '8px',
        outline: "none",
        // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        color: "#222",
        display: "flex",
        overflow: 'hidden',
        padding: '4px 8px',
        width: sm ? '125px' : '100%',
        minWidth: sm ? '80px' : '200px',
        minHeight: '48px',
        fontSize: '16px',
        fontWeight: '600',
        "&:hover": {
            borderColor: '#006D85',
            outline: "none",
        },
        "&:focus": {
            borderColor: '#006D85',
            outline: "none",
        }
    }),
    indicatorSeparator: (base, state) => ({
        ...base,
        display: 'none'
    })
});
const Select = ({
                    name = '',
                    value = null,
                    sm = false,
                    label = '',
                    options = [],
                    setValue = () => {
                    }
                }) => {

    return (
        <div className={clsx({'flex items-center': sm})}>
            {label && <label className={clsx('mb-1.5 text-secondary-300 font-bold flex items-center')}
                             htmlFor={label}>{label}<span
                className={'ml-1.5 inline-block bg-[#006D85] w-1.5 h-1.5 rounded-full'}></span></label>}
            <RSelect
                isClearable
                name={name}
                clearIndicator={true}
                styles={customStyles(sm)}
                id={label}
                value={value}
                onChange={setValue}
                options={options}
                components={{DropdownIndicator}}
                placeholder={sm ? '' : 'Не выбран'}
            />
        </div>
    );
};

export default Select;