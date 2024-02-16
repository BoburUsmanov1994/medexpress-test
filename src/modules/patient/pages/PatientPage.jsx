import React from 'react';
import {useParams} from "react-router-dom"
import PatientContainer from "../containers/PatientContainer";

const PatientPage = () => {
    const {id} = useParams()
    return (
        <>
            <PatientContainer id={id}/>
        </>
    );
};

export default PatientPage;