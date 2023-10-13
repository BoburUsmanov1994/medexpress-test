import React from 'react';
import PuffLoader from "react-spinners/PuffLoader";

const ContentLoader = () => {
    return (
        <div
            className={'absolute w-full h-full top-0 left-0 z-50 flex items-center justify-center bg-[rgba(255,255,255,0.75)]'}>
            <PuffLoader color={'#006D85'} size={100}/>
        </div>
    );
};

export default ContentLoader;