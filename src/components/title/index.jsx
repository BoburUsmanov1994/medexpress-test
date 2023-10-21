import React from 'react';
import clsx from "clsx";

const Title = ({children, className = '', sm = false}) => {
    return (
        <h1 className={clsx('text-3xl font-bold', className, {'!text-2xl': sm})}>
            {children}
        </h1>
    );
};

export default Title;