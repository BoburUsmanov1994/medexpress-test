import React, {useEffect, useMemo} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {usePostQuery} from "../../../hooks/api";
import {get, isNil} from "lodash";
import {OverlayLoader} from "../../../components/loader";
import {KEYS} from "../../../constants/keys";
import {URLS} from "../../../constants/urls";
import {useSettingsStore} from "../../../store";
import useOauth from "../../../hooks/auth/useOauth";

const SSOCallbackPage = () => {
    const [search] = useSearchParams();
    const {verifier_code, client_id, redirect_uri} = useOauth()
    const setToken = useSettingsStore((state) => get(state, 'setToken', () => {
    }))
    const setVerifierCode = useSettingsStore((state) => get(state, 'setVerifierCode', () => {
    }))
    const setChallengeCode = useSettingsStore((state) => get(state, 'setChallengeCode', () => {
    }))
    const params = useMemo(() => new URLSearchParams({
        grant_type: 'authorization_code',
        code: search.get('code'),
        code_verifier: verifier_code,
        redirect_uri,
        client_id
    }), [search.get('code'), verifier_code]);
    const navigate = useNavigate()

    const {mutate: getTokenRequest, isLoading} = usePostQuery({listKeyId: KEYS.token, sso: true})
    const getToken = () => {
        getTokenRequest({
                url: URLS.token,
                attributes: params
            },
            {
                onSuccess: ({data: response}) => {
                    console.log('response', response)
                    setToken(get(response, 'access_token'));
                    navigate('/dispensaries/outpatient-reports');
                },
                onError: () => {
                    setVerifierCode(null);
                    setChallengeCode(null);
                    navigate('/auth');
                }
            }
        )
    }

    useEffect(() => {
        if (search.get('code') && !isNil(verifier_code)) {
            getToken();
        }
    }, [search.get('code')])

    if (isLoading) {
        return <OverlayLoader/>
    }
    return (
        <>

        </>
    );
};

export default SSOCallbackPage;