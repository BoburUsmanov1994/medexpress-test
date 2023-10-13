import React from 'react';
import {useParams} from "react-router-dom"

const OrganizationPage = () => {
    const {id} = useParams()
    return (
        <>
            {id}
        </>
    );
};

export default OrganizationPage;