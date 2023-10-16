import React, {useEffect, useState} from 'react';
import clsx from "clsx";
import {useSearchParams} from "react-router-dom";
import {isArray} from "lodash";

const Tabs = ({children, isLabelDisabled = false}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState(searchParams.get('tab') ?? children[0]?.props?.tab);

    useEffect(() => {
        if (searchParams.get('tab')) {
            setActiveTab(searchParams.get('tab'));
        }
    }, [searchParams.get('tab')])

    const handleClick = (e, newActiveTab) => {
        e.preventDefault();
        if (!isLabelDisabled) {
            setActiveTab(newActiveTab);
            setSearchParams(`tab=${newActiveTab}`)
        }
    };
    return (
        <div>
            <div className="flex border-b border-[rgba(0,0,0,0.1)]">
                {isArray(children) ? children.map(child => (
                    <button
                        key={child?.props?.tab}
                        className={clsx('tab__item_link', {'active': activeTab === child?.props?.tab})}
                        onClick={e => handleClick(e, child?.props?.tab)}
                    >
                        {child?.props?.label}
                    </button>
                )) : <button
                    key={children?.props?.tab}
                    className={clsx('tab__item_link', {'active': activeTab === children?.props?.tab})}
                    onClick={e => handleClick(e, children?.props?.tab)}
                >
                    {children?.props?.label}
                </button>}
            </div>
            <div className="py-6">
                {isArray(children) ? children.map(child => {
                    if (child?.props?.tab === activeTab) {
                        return <div key={child?.props?.tab}>{child?.props?.children}</div>;
                    }
                    return null;
                }) : <div key={children?.props?.tab}>{children?.props?.children}</div>}
            </div>
        </div>
    );
};

const Tab = ({label, children}) => {
    return (
        <div label={label} className="hidden">
            {children}
        </div>
    );
};
export {Tabs, Tab};