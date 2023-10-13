import React from 'react';
import clsx from "clsx";

const Title = ({children,className}) => {
    return (
        <h1 className={clsx('text-3xl font-bold',className)}>
            {children}
        </h1>
    );
};

export default Title;