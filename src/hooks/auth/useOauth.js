import React, {useEffect, useMemo} from 'react';
import crypto from 'crypto';
import base64url from 'base64url';
import {useSettingsStore} from "../../store";
import {get, isNil} from "lodash";
import config from "../../config";
import {URLS} from "../../constants/urls";


const authorization_endpoint = `${config.SSO_ROOT}${URLS.oauth}`;
const verifier = crypto.randomBytes(32).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
const challenge = base64url(crypto.createHash('sha256').update(verifier).digest());
const redirect_uri = window.location.origin + '/auth/callback'
console.log('redirect_uri',redirect_uri)

const useOauth = () => {
    const setVerifierCode = useSettingsStore((state) => get(state, 'setVerifierCode', () => {
    }))
    const setChallengeCode = useSettingsStore((state) => get(state, 'setChallengeCode', () => {
    }))
    const verifier_code = useSettingsStore(state => get(state, "verifier_code", null))
    const challenge_code = useSettingsStore(state => get(state, "challenge_code", null))

    const params = useMemo(() => new URLSearchParams({
        client_id: config.CLIENT_ID,
        redirect_uri,
        response_type: 'code',
        code_challenge_method: 'S256',
        code_challenge: challenge,
    }), []);
    const ssoUrl = `${authorization_endpoint}?${params.toString()}`;
    useEffect(() => {
        if (isNil(verifier_code) && isNil(challenge_code)) {
            setVerifierCode(verifier)
            setChallengeCode(challenge)
        }
    }, [])
    return {
        verifier_code,
        challenge_code,
        redirect_uri,
        client_id: config.CLIENT_ID,
        ssoUrl
    };
};

export default useOauth;