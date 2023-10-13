import React from 'react';
import clsx from "clsx";

const Wrapper = ({children, full = true}) => {
    return (
        <div className={clsx('px-10')}>
            {children}
        </div>
    );
};

export default Wrapper;