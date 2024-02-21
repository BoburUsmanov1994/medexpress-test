import React from 'react';
import clsx from "clsx";
import {REPORT_TYPE_STATUS} from "../../constants";

const Index = ({children, status = 'success'}) => {
    return (
        <span className={clsx('py-1 px-3 rounded-2xl font-semibold bg-[#FEF5ED] text-[#F2994A] whitespace-nowrap', {
            '!bg-[#EAF7F0] !text-[#27AE60]': status === REPORT_TYPE_STATUS.success,
            '!bg-red-100 !text-[#EB5757]': status === REPORT_TYPE_STATUS.failed
        })}>
            {children}
        </span>
    );
};

export default Index;