
import React from 'react';
import {useParams} from "react-router-dom";
import PatientUpdateContainer from "../containers/PatientUpdateContainer";

const PatientCreatePage = () => {
    const {id} = useParams()
    return (
        <>
            <PatientUpdateContainer id={id}/>
        </>
    );
};

export default PatientCreatePage;