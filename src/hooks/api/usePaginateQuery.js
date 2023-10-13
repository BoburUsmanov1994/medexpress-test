import React from 'react';
import {useQuery} from '@tanstack/react-query'
import {request} from "../../services/api";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

const usePaginateQuery = ({
                              key = "get-all",
                              url = "/",
                              page = 1,
                              params = {},
                              showSuccessMsg = false,
                              showErrorMsg = false
                          }) => {
    const {t} = useTranslation()

    const {
        isLoading,
        isError,
        data,
        error,
        isFetching
    } = useQuery([key, page,params], () => request.get(`${url}`, params), {
        keepPreviousData: true,
        onSuccess: () => {
            if (showSuccessMsg) {
                toast.success(t('SUCCESS'))
            }
        },
        onError: (data) => {
            if (showErrorMsg) {
                toast.error(t(data?.response?.data?.message) || t(`ERROR`))
            }
        }
    });

    return {
        isLoading,
        isError,
        data,
        error,
        isFetching
    }
};

export default usePaginateQuery;