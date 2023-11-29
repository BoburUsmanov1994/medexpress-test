import React, {useState} from 'react';
import Brand from "../../../components/brand";
import oneIdIcon from "../../../assets/icons/oneid.svg";
import {useForm} from "react-hook-form";
import {useSettingsStore} from "../../../store";
import {get} from "lodash"
import useOauth from "../../../hooks/auth/useOauth";
import {OverlayLoader} from "../../../components/loader";
import {useTranslation} from "react-i18next";

const LoginContainer = () => {
    const {t} = useTranslation()
    const [loading, setLoading] = useState(false)
    const setToken = useSettingsStore((state) => get(state, 'setToken', () => {
    }))
    const {ssoUrl, verifier_code} = useOauth()
    const {handleSubmit} = useForm();
    const onSubmit = () => {
        setToken(`test token`)
    }
    const loginWithSSO = () => {
        setLoading(true);
        window.open(ssoUrl, '_self')
    }
    if (loading) {
        return <OverlayLoader/>
    }
    return (
        <div className={'p-8 bg-white rounded-lg'}>
            <div className="text-center mb-6">
                <Brand className="mb-4 inline-block" mini/>
                <h2 className={'text-2xl font-bold'}>{t("Вход в систему")}</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <button onClick={() => loginWithSSO()} type={'button'}
                        className={'w-full p-3.5 rounded-lg bg-primary block w-full text-white font-bold text-center h-12'}>
                    {t("Войти через SSO")}
                </button>
                <div className={'my-5 flex items-center'}>
                    <span className={'h-[1px] bg-secondary-150 flex-grow block'}></span> <span
                    className={'text-secondary-200 mx-2.5 font-medium'}>{t("или")}</span> <span
                    className={'h-[1px] bg-secondary-150 flex-grow block'}></span>
                </div>
                <button
                    className={'p-3.5 rounded-lg bg-[#4825C2] block w-full text-white font-bold text-center flex justify-center items-center h-12'}
                    type={'submit'}>
                    <img className={'mr-2.5'} src={oneIdIcon} alt="one id"/><span> {t("Войти через One ID")}</span>
                </button>
            </form>
        </div>
    );
};

export default LoginContainer;