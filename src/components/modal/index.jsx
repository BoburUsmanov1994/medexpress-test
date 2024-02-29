import React, {useEffect} from 'react';
import {X} from "react-feather";
import clsx from "clsx";

const Modal = ({
                   children,
                   onClose = () => {
                   },
                   open = false,
                   title = '',
                   classNames = '',

               }) => {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [open]);
    return (
        <>
            {
                open && <div className={'h-screen fixed top-0 left-0 w-full z-50'}>
                    <div onClick={onClose} className={'absolute top-0 left-0 h-full w-full z-5 bg-[rgba(34,34,34,0.75)]'}/>
                    <div
                        className={clsx('bg-white p-6 z-10 absolute top-1/2 left-1/2 min-w-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded shadow-card max-h-[85vh] overflow-y-auto', classNames)}>
                        <div>
                            <h2 className={'text-2xl font-bold mb-6'}>{title}</h2>
                            <X size={32} onClick={onClose} className={'absolute right-3 top-3 cursor-pointer'}/>
                        </div>
                        {children}
                    </div>
                </div>
            }
        </>
    );
};

export default Modal;