import React from 'react';
import {useParams} from "react-router-dom"
import PatientRecipeContainer from "../containers/PatientRecipeContainer";

const PatientRecipePage = () => {
    const {id} = useParams()
    return (
        <>
            <PatientRecipeContainer id={id}/>
        </>
    );
};

export default PatientRecipePage;