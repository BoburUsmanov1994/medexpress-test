import React from 'react';
import {useQuery, useQueryClient} from '@tanstack/react-query'
import {request} from "../../services/api";
import {toast} from "react-toastify";

const useGetAllQuery = ({
                            key = "get-all",
                            url = "/",
                            params = {},
                            showSuccessMsg = false,
                            hideErrorMsg = false,
                            enabled = true,
                            refetchOnMount = true,
                            cb = {
                                success: () => {
                                },
                                fail: () => {
                                }
                            },
                            disableParams = false
                        }) => {
    const queryClient = useQueryClient();
    const {
        isLoading,
        isError,
        data,
        error,
        isFetching
    } = useQuery(!disableParams ? [key,url, params] : [key], () => request.get(url, params), {
        onSuccess: ({data}) => {
            cb?.success(data)
        },
        onError: (data) => {
            cb?.fail()
            if (!hideErrorMsg) {
                toast.error(data?.response?.data?.message || `ERROR!!! ${url} api not working`)
            }
        },
        enabled,
        refetchOnMount
    });

    return {
        isLoading,
        isError,
        data,
        error,
        isFetching,
        queryClient
    }
};

export default useGetAllQuery;