import React, {useState} from 'react';
import clsx from "clsx";

const Checkbox = ({
                      id,
                      label,
                      checked,
                      ...props
                  }) => {
    const [isChecked, setIsChecked] = useState(checked);
    return (
        <div className="checkbox-wrapper cursor-pointer">
            <input
                id={id}
                type="checkbox"
                className={clsx('inline-block flex-none', {'checked': isChecked})}
                checked={isChecked}
                onChange={() => setIsChecked((prev) => !prev)}
                {...props}
            />
            <label className={'cursor-pointer'} htmlFor={id}>{label}</label>
        </div>
    );
};

export default Checkbox;