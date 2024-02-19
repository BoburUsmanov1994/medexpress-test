import React from 'react';
import FormConsumer from "../../context/form/FormConsumer";
import Input from "./components/Input";
import Select from "./components/Select";
import AsyncSelect from "./components/AsyncSelect";
import MaskedInput from "./components/Masked-Input";
import PhoneNumber from "./components/PhoneNumber";
import Dropzone from "./components/Dropzone";
import Datepicker from "./components/Datepicker";
import {Textarea} from "./components";

const Field = ({type, ...rest}) => {
    return (
        <>
            {
                ((type) => {
                    switch (type) {
                        case 'input':
                            return <FormConsumer>{({attrs, getValueFromField}) => <Input {...rest} {...attrs}
                                                                                         getValueFromField={getValueFromField}/>}</FormConsumer>;
                        case 'select':
                            return <FormConsumer>{({attrs, getValueFromField}) => <Select {...rest} {...attrs}
                                                                                                getValueFromField={getValueFromField}/>}</FormConsumer>;
                        case 'async-select':
                            return <FormConsumer>{({attrs, getValueFromField}) => <AsyncSelect {...rest} {...attrs}
                                                                                            getValueFromField={getValueFromField}/>}</FormConsumer>;
                        case 'input-mask':
                            return <FormConsumer>{({attrs, getValueFromField}) => <MaskedInput {...rest} {...attrs}
                                                                                               getValueFromField={getValueFromField}/>}</FormConsumer>;
                        case 'phone-number':
                            return <FormConsumer>{({attrs, getValueFromField}) => <PhoneNumber {...rest} {...attrs}
                                                                                            getValueFromField={getValueFromField}/>}</FormConsumer>;
                        case 'dropzone':
                            return <FormConsumer>{({attrs, getValueFromField}) => <Dropzone {...rest} {...attrs}
                                                                                                  getValueFromField={getValueFromField}/>}</FormConsumer>;
                        case 'datepicker':
                            return <FormConsumer>{({attrs, getValueFromField}) => <Datepicker {...rest} {...attrs}
                                                                                                    getValueFromField={getValueFromField}/>}</FormConsumer>;
                        case 'textarea':
                            return <FormConsumer>{({attrs, getValueFromField}) => <Textarea {...rest} {...attrs}
                                                                                              getValueFromField={getValueFromField}/>}</FormConsumer>;
                        default:
                            return <FormConsumer>{({attrs, getValueFromField}) => <Input {...rest} {...attrs}
                                                                                         getValueFromField={getValueFromField}/>}</FormConsumer>
                    }

                })(type)
            }
        </>
    )
}

export default Field;
