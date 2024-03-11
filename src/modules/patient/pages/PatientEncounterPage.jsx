import React from 'react';
import {useParams} from "react-router-dom"
import PatientEncounterContainer from "../containers/PatientEncounterContainer";

const PatientEncounterPage = () => {
    const {id} = useParams()
    return (
        <>
            <PatientEncounterContainer id={id}/>
        </>
    );
};

export default PatientEncounterPage;