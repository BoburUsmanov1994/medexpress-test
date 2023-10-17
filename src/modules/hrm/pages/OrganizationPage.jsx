import React from 'react';
import {useParams} from "react-router-dom"
import OrganizationContainer from "../containers/OrganizationContainer";

const OrganizationPage = () => {
    const {id} = useParams()
    return (
        <>
            <OrganizationContainer id={id}/>
        </>
    );
};

export default OrganizationPage;