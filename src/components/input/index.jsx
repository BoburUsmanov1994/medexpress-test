import React, {useState} from 'react';
import clsx from "clsx";
const Input = ({
                    label = '',
                    handleValue = () => {
                    }
                }) => {
    const [value,setValue] = useState('')

    return (
        <div className={clsx('flex items-center')}>
            {label && <label className={clsx('mr-2 text-secondary-300 font-bold flex items-center')}
                             htmlFor={label}>{label}</label>}
            <input className={'py-2.5 px-4 w-36 rounded-lg outline-none'} type="text" value={value} onChange={(e)=>setValue(e?.target?.value)}/>
        </div>
    );
};

export default Input;