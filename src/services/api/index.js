import axios from "axios";
import {get, includes} from "lodash";
import NProgress from "nprogress";
import storage from "../storage";
import config from "../../config";
import Swal from "sweetalert2";
import i18n from 'i18next'


NProgress.configure({
    showSpinner: true,
    trickleRate: 0.02,
    trickleSpeed: 400,
    easing: "ease",
    speed: 200
});

const request = axios.create({
    baseURL: config.API_ROOT,
    params: {},
    headers: {
        common: {
            "Accept": "application/json",
            "Content-Type": "application/json; charset=utf-8"
        }
    }

});

const sso = axios.create({
    baseURL: config.SSO_ROOT,
    params: {},
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}

});


request.interceptors.request.use((config) => {
    if (!includes(window.location.href, 'auth')) {
        NProgress.inc();
    }
    const token = get(JSON.parse(storage.get('settings')), 'state.token', null);

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    const lang = get(JSON.parse(storage.get('settings')), 'state.lang', 'ru');

    if(lang){
        config.headers['Accept-Language'] = lang
    }

    return config;
}, (error) => {
    NProgress.done(true);
    return Promise.reject(error);
});

request.interceptors.response.use((response) => {
    NProgress.done(true);
    return response;
}, (error) => {
    // if (error?.response?.status == 401) {
    //     if (!includes(window.location.pathname, 'auth') && window.location.pathname != '/') {
    //         Swal.fire({
    //             title: i18n.t('Your token expired'),
    //             icon: 'error',
    //             backdrop: 'rgba(0,0,0,0.9)',
    //             background: 'none',
    //             confirmButtonColor: '#f27474',
    //             confirmButtonText: i18n.t('Logout'),
    //             allowOutsideClick: false,
    //             timer: 2000,
    //             // showConfirmButton:false,
    //             customClass: {
    //                 title: 'title-color',
    //                 content: 'text-color',
    //                 icon: 'icon-color',
    //             },
    //         }).then((result) => {
    //             window.localStorage.clear();
    //             window.location.href = '/auth';
    //         })
    //     } else {
    //         window.localStorage.clear();
    //     }
    //
    // }
    NProgress.done(true);
    return Promise.reject(error);
});

export {request, sso};