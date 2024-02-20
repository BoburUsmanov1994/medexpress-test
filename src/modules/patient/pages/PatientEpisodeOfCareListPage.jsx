import React from 'react';
import {useParams} from "react-router-dom"
import PatientEpisodeOfCareListContainer from "../containers/PatientEpisodeOfCareListContainer";

const PatientEpisodeOfCareListPage = () => {
    const {id} = useParams()
    return (
        <>
            <PatientEpisodeOfCareListContainer id={id}/>
        </>
    );
};

export default PatientEpisodeOfCareListPage;