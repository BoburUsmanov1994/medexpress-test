import React from 'react';
import clsx from "clsx";

const Content = ({children,classNames='',sm=false}) => {
    return (
        <div className={clsx('bg-[#ECECEC] p-10  min-h-[calc(100vh-80px)]',classNames,{'!p-6 !bg-white rounded-lg mt-2 !min-h-[60vh]':sm})}>
            {children}
        </div>
    );
};

export default Content;