import React from 'react';

const Section = ({
                     children
                 }) => {
    return (
        <div className={'bg-white py-4 px-7 shadow-box'}>
            {children}
        </div>
    );
};

export default Section;