import React from 'react';
import {useForm} from "react-hook-form";

const Form = ({defaultValues, children, onSubmit, classNames = ''}) => {
    const methods = useForm({defaultValues});
    const {handleSubmit, formState: {errors,isDirty,isLoading}, setError, clearErrors, reset,getValues,watch,trigger} = methods;
    const onSubmitRequest = (data) => {
        onSubmit({data, setError, clearErrors, reset})
    }
    console.log('errors',errors)
    return (
        <form className={classNames} onSubmit={handleSubmit(onSubmitRequest)}>
            {React?.Children?.map(children, child => {
                return child?.props?.name
                    ? React.createElement(child?.type, {
                        ...{
                            ...child?.props,
                            control: methods?.control,
                            setValue: methods?.setValue,
                            getValues:getValues,
                            watch: watch,
                            register: methods?.register,
                            key: child?.props?.name,
                            errors: errors,
                            isDirtyForm:isDirty,
                            isLoadingForm:isLoading,
                            trigger:trigger
                        }
                    })
                    : child;
            })}
        </form>
    );
};

export default Form;