import React from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {request, sso} from "../../services/api";
import {toast} from "react-toastify";
import {isArray, get, forEach} from "lodash";
import {useTranslation} from "react-i18next";

const postRequest = (url, attributes, config = {}) => request.post(url, attributes, config);
const ssoPostRequest = (url, attributes, config = {}) => sso.post(url, attributes, config);

const usePostQuery = ({
                          hideSuccessToast = false, listKeyId = null, sso = false, cb = {
            success: () => {
            },
            fail: () => {
            }
        }
                      }) => {

        const {t} = useTranslation()

        const queryClient = useQueryClient();

        const {mutate, isLoading, isError, error, isFetching} = useMutation(
            ({
                 url,
                 attributes,
                 config = {}
             }) => sso ? ssoPostRequest(url, attributes, config) : postRequest(url, attributes, config),
            {
                onSuccess: (data) => {
                    if (!hideSuccessToast) {
                        toast.success(t(data?.data?.message) || t('SUCCESS'))
                    }

                    if (listKeyId) {
                        if (isArray(listKeyId)) {
                            forEach(listKeyId, (val) => {
                                queryClient.invalidateQueries(val)
                            })
                        } else {
                            queryClient.invalidateQueries(listKeyId)
                        }
                    }
                },
                onError: (data) => {
                    if (isArray(get(data, 'response.data.errors'))) {
                        forEach(get(data, 'response.data.errors', []), (val) => {
                            toast.error(val ?? 'ERROR')
                        })
                    } else {
                        toast.error(t(data?.response?.data?.message) || t('ERROR'))
                    }
                }
            }
        );

        return {
            mutate,
            isLoading,
            isError,
            error,
            isFetching,
        }
    }
;

export default usePostQuery;