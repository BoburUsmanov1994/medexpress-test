import React from "react";
import {Controller, useForm} from "react-hook-form";
import FormProvider from "../../context/form/FormProvider";

const Form = ({
                  children,
                  formRequest,
                  isFetched,
                  footer = '',
                  getValueFromField = () => {
                  },
                  classNames = '',
                  defaultValues = {},
                  ...rest
              }) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors,isLoading,isDirty},
        getValues,
        setValue,
        watch,
        control,
        trigger
    } = useForm({defaultValues});

    const onSubmit = (data) => {
        formRequest({ data, setError });
    };
    const attrs = {
        Controller,
        register,
        errors,
        control,
        getValues,
        watch,
        setError,
        setValue,
        trigger,
        isLoadingForm:isLoading,
        isDirty,
        ...rest,
    };


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            {...rest}
            className={classNames}
        >
            <FormProvider value={{attrs, getValueFromField}}>
                {children}
            </FormProvider>
            {footer}
        </form>
    );
};

export default Form;
