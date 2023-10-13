import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import {OverlayLoader} from "./components/loader";
import Query from "./services/query";
import Router from "./router/router";
import reportWebVitals from './reportWebVitals';
import Auth from "./services/auth/Auth";
import {ToastContainer} from "react-toastify";
import "nprogress/nprogress.css";
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/index.css';
// import './services/i18n'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <Suspense fallback={<OverlayLoader/>}>
            <Query>
                <Auth>
                    <Router/>
                </Auth>
            </Query>
            <ToastContainer/>
        </Suspense>
);

reportWebVitals();
