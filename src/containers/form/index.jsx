import React, {useEffect} from "react";
import {useForm, FormProvider} from "react-hook-form";

const Form = ({
                  children,
                  formRequest,
                  footer = '',
                  getValueFromField = () => {
                  },
                  classNames = '',
                  defaultValues = {},
                  ...rest
              }) => {
    const methods = useForm({defaultValues: {...defaultValues}})

    const onSubmit = (data) => {
        formRequest({data});
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className={classNames}
            >
                {children}
                {footer}
            </form>
        </FormProvider>
    );
};

export default Form;
