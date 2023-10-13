import React from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {request} from "../../services/api";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

const putRequest = (url, attributes) => request.put(url, attributes);

const usePutQuery = ({hideSuccessToast = false, listKeyId = null}) => {
        const {t} = useTranslation()
        const queryClient = useQueryClient();

        const {mutate, isLoading, isError, error, isFetching} = useMutation(
            ({
                 url,
                 attributes
             }) => putRequest(url, attributes),
            {
                onSuccess: (data) => {
                    if (!hideSuccessToast) {
                        toast.success(t(data?.data?.message) || t('SUCCESS'))
                    }

                    if (listKeyId) {
                        queryClient.invalidateQueries(listKeyId)
                    }
                },
                onError: (data) => {
                    toast.error(t(data?.response?.data?.message) || t('ERROR'))
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

export default usePutQuery;