import React from "react";
import {Controller, useFieldArray, useForm} from "react-hook-form";
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
                  fieldArrayName = 'contacts',
                  ...rest
              }) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isLoading, isDirty},
        getValues,
        setValue,
        watch,
        control,
        trigger
    } = useForm({defaultValues});

    const {fields, append, prepend, remove, swap, move, insert} = useFieldArray({control, name: fieldArrayName,
        defaultValue: [{ email: "" }]
    })

    const onSubmit = (data) => {
        formRequest({data, setError});
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
        isLoadingForm: isLoading,
        isDirty,
        fieldArrayAttrs: {
            fieldArrayName,
            fields,
            append,
            prepend,
            remove,
            swap,
            move,
            insert
        },
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
