import React, {lazy, Suspense} from 'react';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import AuthLayout from "../layouts/auth";
import IsAuth from "../services/auth/IsAuth";
import IsGuest from "../services/auth/IsGuest";
import {OverlayLoader} from "../components/loader";
import DashboardLayout from "../layouts/dashboard";
import ErrorPage from "../modules/auth/pages/ErrorPage";
import ProfilePage from "../modules/auth/pages/ProfilePage";
import LogoutPage from "../modules/auth/pages/LogoutPage";
import ForbiddenPage from "../modules/auth/pages/ForbiddenPage";
import NotFoundPage from "../modules/auth/pages/NotFoundPage";
import SSOCallbackPage from "../modules/auth/pages/SSOCallbackPage";
import PractitionersPage from "../modules/hrm/pages/PractitionersPage";
import PatientsPage from "../modules/patient/pages/PatientsPage";
import PatientCreatePage from "../modules/patient/pages/PatientCreatePage";
import PatientUpdatePage from "../modules/patient/pages/PatientUpdatePage";
import PatientPage from "../modules/patient/pages/PatientPage";
import PatientEpisodeOfCarePage from "../modules/patient/pages/PatientEpisodeOfCarePage";
import PatientEpisodeOfCareListPage from "../modules/patient/pages/PatientEpisodeOfCareListPage";
import PatientEncounterPage from "../modules/patient/pages/PatientEncounterPage";
import PatientRecipePage from "../modules/patient/pages/PatientRecipePage";

const LoginPage = lazy(() => import("../modules/auth/pages/LoginPage"));
const OrganizationsPage = lazy(() => import("../modules/hrm/pages/OrganizationsPage"));
const OrganizationPage = lazy(() => import("../modules/hrm/pages/OrganizationPage"));
const TranslationsPage = lazy(() => import("../modules/settings/pages/TranslationsPage"));


const Router = ({...rest}) => {
    return (
        <Suspense fallback={<OverlayLoader/>}>
            <BrowserRouter>
                <IsAuth>
                    <Routes>
                        <Route path={"/"} element={<DashboardLayout/>}>
                            <Route index element={<OrganizationsPage/>}/>
                            <Route path={"hrm"}>
                                <Route path={'organizations'} element={<OrganizationsPage/>}/>
                                <Route path={'organization/:id'} element={<OrganizationPage/>}/>
                                <Route path={'practitioners'} element={<PractitionersPage/>}/>
                            </Route>
                            <Route path={'settings'}>
                                <Route path={'translations'} element={<TranslationsPage/>}/>
                            </Route>
                            <Route path={"patient"}>
                                <Route index element={<PatientsPage/>}/>
                                <Route path={"create"} element={<PatientCreatePage/>}/>
                                <Route path={"update/:id"} element={<PatientUpdatePage/>}/>
                                <Route path={"view/:id"} element={<PatientPage/>}/>
                                <Route path={"episode-of-cares/:id"} element={<PatientEpisodeOfCarePage/>}/>
                                <Route path={"episode-of-cares/list/:id"} element={<PatientEpisodeOfCareListPage/>}/>
                                <Route path={"encounter/:id"} element={<PatientEncounterPage/>}/>
                                <Route path={"recipe/:id"} element={<PatientRecipePage/>}/>
                            </Route>
                            <Route path={"/error"} element={<ErrorPage/>}/>
                            <Route path={"/profile"} element={<ProfilePage/>}/>
                            <Route path="/auth/logout" element={<LogoutPage/>}/>
                            <Route path={"/403"} element={<ForbiddenPage/>}/>
                            <Route path={"/404"} element={<NotFoundPage/>}/>
                            <Route path={"auth"} element={<Navigate to={'/hrm/organizations'} replace/>}/>
                            <Route path={"auth/callback"} element={<Navigate to={'/hrm/organizations'} replace/>}/>
                            <Route path={"*"} element={<Navigate to={'404'}/>}/>
                        </Route>
                    </Routes>
                </IsAuth>
                <IsGuest>
                    <Routes>
                        <Route path={"/auth"} element={<AuthLayout/>}>
                            <Route index element={<LoginPage/>}/>
                            <Route path={'callback'} element={<SSOCallbackPage/>}/>
                        </Route>
                        <Route path={"*"} element={<Navigate to={'/auth'} replace/>}/>
                    </Routes>
                </IsGuest>
            </BrowserRouter>
        </Suspense>
    );
};

export default Router;