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
        color: "#222",
        display: "flex",
        overflow: 'hidden',
        padding: '2px 8px',
        width: sm ?'100px':'200px',
        height: '40px',
        fontSize: '16px',
        fontWeight: '600',
        // "&:hover": {
        //     borderColor: '#006D85',
        //     outline: "none",
        // },
        // "&:focus": {
        //     borderColor: '#006D85',
        //     outline: "none",
        // }
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
                    },
                    isClearable=true,
                    isLoading=false
                }) => {

    return (
        <div className={clsx('flex items-center z-50 relative')}>
            {label && <label className={clsx('mr-2 text-secondary-300 font-bold flex items-center')}
                             htmlFor={label}>{label}</label>}
            <RSelect
                isLoading={isLoading}
                isClearable={isClearable}
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