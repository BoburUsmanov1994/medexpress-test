import React from 'react';
import {useParams} from "react-router-dom"
import PatientEpisodeOfCareContainer from "../containers/PatientEpisodeOfCareContainer";

const PatientEpisodeOfCarePage = () => {
    const {id} = useParams()
    return (
        <>
            <PatientEpisodeOfCareContainer id={id}/>
        </>
    );
};

export default PatientEpisodeOfCarePage;