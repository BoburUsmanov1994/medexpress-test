import React, {useState} from 'react';
import clsx from "clsx";
import InputMask from "react-input-mask";
const InputMaskComponent = ({
                    label = '',
                    handleValue = () => {
                    },
                   mask='',
                   maskChar='-',
                   placeholder=''
                }) => {
    const [value,setValue] = useState('')

    return (
        <div className={clsx('flex items-center')}>
            {label && <label className={clsx('mr-2 text-secondary-300 font-bold flex items-center')}
                             htmlFor={label}>{label}</label>}
            <InputMask
                className={clsx('py-2.5 px-4 w-36 rounded-lg outline-none')}
                placeholder={placeholder}
                mask={mask}
                maskChar={maskChar}
                // value={value}
                // onChange={setValue}
            />
        </div>
    );
};

export default InputMaskComponent;