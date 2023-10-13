import React, {createRef, useEffect, useState} from 'react';
import {useOutsideClick} from "../../hooks/general/use-outside-click"
import clsx from "clsx";
import {isNil} from "lodash";

const Index = ({
                   btn, children, classNames = '',defaultOpen = false,changeDefaultOpen = () => {}
               }) => {
    const ref = createRef();
    const [open, setOpen] = useState(false);
    useOutsideClick(ref, () => setOpen(false));
    useEffect(()=>{
        if(!isNil(defaultOpen)){
            setOpen(defaultOpen)
            changeDefaultOpen()
        }
    },[defaultOpen])
    return (
        <div ref={ref} className={'relative inline-flex items-center '}>
            <button onClick={() => setOpen(prev => !prev)}>
                {btn}
            </button>
            {open && <div
                className={clsx('bg-white  rounded-b-xl p-2.5 absolute left-1/2 min-w-[60px]  w-full top-full z-50 mt-2.5 -translate-x-1/2 text-left', classNames)}>
                {children}
            </div>}
        </div>
    );
};

export default Index;