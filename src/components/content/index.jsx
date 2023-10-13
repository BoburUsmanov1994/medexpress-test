import React from 'react';

const Content = ({children}) => {
    return (
        <div className={'bg-[#ECECEC] p-10  min-h-[calc(100vh-80px)]'}>
            {children}
        </div>
    );
};

export default Content;