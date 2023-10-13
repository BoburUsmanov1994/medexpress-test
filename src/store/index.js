import create from 'zustand'
import {devtools, persist} from "zustand/middleware";
import config from "../config";
import storage from "../services/storage";


let store = (set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user) => set(state => ({...state, user})),
    setAuth: (isAuthenticated) => set(state => ({...state, isAuthenticated})),
})

let settingsStore = (set) => ({
    verifier_code:null,
    challenge_code:null,
    token: null,
    lang: storage.get('lang') || config.DEFAULT_APP_LANG,
    setToken: (token) => set(state => ({...state, token})),
    setLang: (lang) => set(state => ({...state, lang})),
    setVerifierCode: (verifier_code) => set(state => ({...state, verifier_code})),
    setChallengeCode: (challenge_code) => set(state => ({...state, challenge_code})),
})


store = devtools(store);
settingsStore = devtools(settingsStore)
settingsStore = persist(settingsStore, {name: 'settings'});

export const useStore = create(store)
export const useSettingsStore = create(settingsStore)

